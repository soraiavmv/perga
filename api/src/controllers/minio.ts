import { Request, Response } from 'express';
import { BucketItem } from 'minio';
import { PassThrough } from 'stream';
import busboy from 'busboy';
import { config } from '../config';
import ffmpeg from '../middleware/ffmpeg';
import minioClient from '../middleware/minio';
import sharp from 'sharp';

class MinioController {
  uploadPhoto(req: Request, res: Response) {
    const bb = busboy({ headers: req.headers });

    bb.on('file', (_name, file, info) => {
      const { mimeType, filename } = info;

      if (mimeType.split('/')[0] !== 'image') {
        console.log('Error uploading file: Invalid file format');
        return res.status(400).json({
          message: 'Error uploading file',
          cause: 'Invalid file format'
        });
      }
      const splitFilename = filename.split('.');

      try {
        minioClient.putObject(config.minio.BUCKET, filename, file);

        const transformer = sharp().resize(300, 300);

        minioClient.putObject(
          config.minio.BUCKET,
          `${splitFilename[0]}-thumbnail.${splitFilename[1]}`,
          file.pipe(transformer)
        );
      } catch (err) {
        console.log('Error uploading files:', err);
        return res.status(500).json({
          message: 'Error uploading file'
        });
      }
    })
      .on('error', (error) => {
        console.log('Error uploading files: \n', error);

        res.status(500).json({
          message: 'Error uploading file'
        });
      })
      .on('close', () => {
        res.status(201).json({
          message: 'File successfully uploaded'
        });
        res.end();
      });

    req.pipe(bb);
  }

  uploadVideo(req: Request, res: Response) {
    const bb = busboy({ headers: req.headers });

    bb.on('file', async (_name, file, info) => {
      const { mimeType, filename } = info;

      if (mimeType.split('/')[0] !== 'video') {
        console.log('Error uploading file: Invalid file format');
        return res.status(400).json({
          message: 'Error uploading file',
          cause: 'Invalid file format'
        });
      }

      const splitFilename = filename.split('.');

      try {
        // upload video
        minioClient.putObject(config.minio.BUCKET, filename, file);

        // transformer to create video screenshot
        const transformer = ffmpeg(file)
          .seekOutput('00:00:01')
          .frames(1)
          .format('image2pipe')
          .size('300x300');

        // save screenshot to minio bucket
        await minioClient.putObject(
          config.minio.BUCKET,
          `${splitFilename[0]}-thumbnail${'.png'}`,
          transformer.pipe() as PassThrough
        );
      } catch (err) {
        console.log('Error uploading files:', err);
        return res.status(500).json({
          message: 'Error uploading file'
        });
      }
    })
      .on('error', (error) => {
        console.log('Error uploading files: \n', error);
        res.status(500).json({
          message: 'Error uploading file'
        });
      })
      .on('close', () => {
        res.status(201).json({
          message: 'File successfully uploaded'
        });
        res.end();
      });

    req.pipe(bb);
  }

  getFileNames(_req: Request, res: Response) {
    const stream = minioClient.listObjectsV2(config.minio.BUCKET, '', true, '');
    const data: string[] = [];

    stream
      .on('data', (obj: BucketItem) => {
        if (obj.name.includes('thumbnail')) data.push(obj.name);
      })
      .on('end', () => res.send(data))
      .on('error', (error) => {
        console.log('Error fetching files information from MinIo: \n', error);

        res.status(500).json({
          message: 'An error occurred while fetching file names.'
        });
      });
  }

  async getImage(req: Request, res: Response) {
    const { name } = req.params;
    minioClient.getObject(
      config.minio.BUCKET,
      name,
      async (error, dataStream) => {
        if (error) {
          console.log('Error fetching file: \n', error);
          res.status(404).json({ message: 'File Not Found' });
          return;
        }

        dataStream.on('error', (err) => {
          console.log('Error fetching files information from MinIo: \n', err);
          res.status(500).json({
            message: 'An error occurred while fetching files.'
          });
        });
        dataStream.pipe(res);
      }
    );
  }
}

export const MinioControllerInstance = new MinioController();
