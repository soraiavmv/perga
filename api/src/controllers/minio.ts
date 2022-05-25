import { Request, Response } from 'express';
import { BucketItem } from 'minio';
import busboy from 'busboy';
import { config } from '../config';
import minioClient from '../middleware/minio';

class MinioController {
  uploadFile(req: Request, res: Response) {
    const bb = busboy({ headers: req.headers });

    bb.on('file', (_name, file, info) => {
      const { mimeType, filename } = info;

      if (mimeType.split('/')[0] !== 'image') {
        console.log('Error fetching files: Invalid file format');
        return res.status(400).json({
          message: 'Error uploading file',
          cause: 'Invalid file format'
        });
      }
      minioClient.putObject(config.minio.BUCKET, filename, file);
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
        data.push(obj.name);
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
