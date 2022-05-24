const env = process.env.ENV || 'dev';

if (env === 'dev') {
  // eslint-disable-next-line
  require('dotenv').config();
}

export const config = {
  server: {
    PORT: Number(process.env.PORT) || 8000
  },
  minio: {
    ACCESS_KEY: String(process.env.ACCESS_KEY) || 'minio',
    SECRET: String(process.env.SECRET_KEY) || 'minio123',
    BUCKET: String(process.env.BUCKET) || 'perga',
    MINIO_PORT: Number(process.env.MINIO_PORT) || 9000,
    ENDPOINT: String(process.env.ENDPOINT || 'host.docker.internal')
  }
};
