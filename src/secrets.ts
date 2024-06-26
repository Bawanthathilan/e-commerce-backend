import dotenv from 'dotenv';

dotenv.config({
  path: '.env'
});

export const PORT = process.env.PORT;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
export const CLOUD_NAME = process.env.CLOUD_NAME
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY
export const CLOUD_SECRET_KEY = process.env.CLOUD_SECRET_KEY

