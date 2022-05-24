import * as Minio from 'minio';
import { config } from '../config';

const minioClient: Minio.Client = new Minio.Client({
  endPoint: config.minio.ENDPOINT,
  port: config.minio.MINIO_PORT,
  useSSL: false,
  accessKey: config.minio.ACCESS_KEY,
  secretKey: config.minio.SECRET
});

export default minioClient;
