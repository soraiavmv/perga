import { MinioControllerInstance } from './controllers';
import Multer from 'multer';
import { config } from './config';
import cors from 'cors';
import express from 'express';
import minioClient from './middleware/minio';

const startServer = async () => {
  const app = express();
  const PORT = config.server.PORT;
  const BUCKET = config.minio.BUCKET;

  app.use(express.json());
  app.use(cors());

  app.post(
    '/new-picture',
    Multer({ storage: Multer.memoryStorage() }).single('upload'),
    MinioControllerInstance.uploadFile
  );

  app.get('/list-pictures', MinioControllerInstance.getImages);

  // setup MinIo bucket
  minioClient.listBuckets((err, buckets) => {
    if (err) {
      console.log('Error creating bucket: ', err);
      return;
    }

    const bucket = buckets.filter((bucket) => bucket.name === BUCKET);
    let readyToListen = false;

    // check if bucket exists, create it if it doesn't
    if (bucket.length === 0) {
      minioClient.makeBucket(BUCKET, '', (err) => {
        if (err) {
          console.log('Error creating bucket: ', err);
          return;
        }
        console.log('Bucket created successfully: ', BUCKET);
        readyToListen = true;
      });
    } else {
      readyToListen = true;
    }

    // start server
    if (readyToListen) {
      console.log('Connecting...');
      app.listen(PORT, function () {
        console.log(`~~ 👂 LISTENING ON PORT ${PORT} 👂 ~~`);
      });
    }
  });

  return app;
};

startServer().catch(console.error);
