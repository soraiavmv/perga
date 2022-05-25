import { Request, Response } from 'express';
import { BucketItem } from 'minio';
import busboy from 'busboy';
import { config } from '../config';
import minioClient from '../middleware/minio';

class MinioController {
  uploadFile(req: Request, res: Response) {
    const bb = busboy({ headers: req.headers });

    bb.on('file', (name, file, info) => {
      const { mimeType, filename } = info;

      if (mimeType.split('/')[0] !== 'image') {
        return res.status(400).json({
          message: 'Error uploading file'
        });
      }
      minioClient.putObject(config.minio.BUCKET, filename, file);
    })
      .on('error', () => {
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

  async getImages(_req: Request, res: Response) {
    const data: string[] = [];
    const stream = minioClient.listObjectsV2(config.minio.BUCKET, '', true, ''); // get file names to later fetch the actual files
    const pictures: any[] = [];

    stream
      .on('data', (obj: BucketItem) => {
        data.push(obj.name); // save fetched objects
      })
      .on('end', () => {
        data.forEach((filename) =>
          minioClient.getObject(
            config.minio.BUCKET,
            filename,
            async (error, dataStream) => {
              if (error) {
                console.log('Error fetching file: \n', error);
                return;
              }

              const picture: any[] = [];

              dataStream
                .on('data', (data) => {
                  picture.push(...data);
                })
                .on('end', () => {
                  pictures.push(picture);

                  if (pictures.length === data.length) {
                    res.send(pictures);
                  }
                });
            }
          )
        );
        if (data.length === 0) res.send([]);
      })
      .on('error', (err) => {
        console.log('Error fetching files information from MinIo:', err);
        res.status(500).json({
          message: 'An error occurred while fetching files.'
        });
      });
  }
}

export const MinioControllerInstance = new MinioController();
