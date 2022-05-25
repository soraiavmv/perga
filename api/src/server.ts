import express, { Express } from 'express';
import { MinioControllerInstance } from './controllers';
import { config } from './config';
import cors from 'cors';
import minioClient from './middleware/minio';

const startServer = async () => {
  const app = express();
  const PORT = config.server.PORT;
  const BUCKET = config.minio.BUCKET;

  app.use(express.json());
  app.use(cors());

  app.post('/new-picture', MinioControllerInstance.uploadFile);

  app.get('/list-pictures', MinioControllerInstance.getImages);

  // setup MinIo bucket
  minioClient.listBuckets((err, buckets) => {
    if (err) {
      console.log('Error creating bucket: ', err);
      return;
    }

    const result = buckets.filter((bucket) => bucket.name === BUCKET);

    // check if bucket exists, create it if it doesn't
    if (result.length === 0) {
      minioClient.makeBucket(BUCKET, '', (err) => {
        if (err) {
          console.log('Error creating bucket: ', err);
          return;
        }
        listen(app, PORT);
        console.log('Bucket created successfully: ', BUCKET);
      });
    } else {
      listen(app, PORT);
    }
  });

  return app;
};

const listen = (app: Express, PORT: number) => {
  console.log('Connecting...');
  app.listen(PORT, function () {
    console.log(`~~ 👂 LISTENING ON PORT ${PORT} 👂 ~~`);
  });
};

startServer().catch(console.error);
