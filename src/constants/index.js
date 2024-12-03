import path from 'node:path';

export const ENV_VARS = {
  PORT: 'PORT',
  JWT_SECRET: 'JWT_SECRET',
  FRONTEND_HOST: 'FRONTEND_HOST',
  BACKEND_HOST: 'BACKEND_HOST',
  IS_CLOUDINARY_ENABLED: 'IS_CLOUDINARY_ENABLED',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_HOST: 'SMTP_HOST',
  SMTP_USERNAME: 'SMTP_USERNAME',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const MONGO_DB_VARS = {
  MONGO_USER: 'MONGO_USER',
  MONGO_PASSWORLD: 'MONGO_PASSWORLD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'upload');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUDINARY_CLOUD_NAME',
  API_KEY: 'CLOUDINARY_API_KEY',
  API_SECRET: 'CLOUDINARY_API_SECRET',
};

export const GOOGLE = {
  CLIENT_ID: 'GOOGLE_CLIENT_ID',
  CLIENT_SECRET: 'GOOGLE_CLIENT_SECRET',
};

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
