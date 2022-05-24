import dotenv from 'dotenv';

dotenv.config({
  path: `.env`
});

const config = {
  api: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
  }
};

export default config;
