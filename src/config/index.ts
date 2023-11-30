import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}` });

export const ENVIRONMENT = process.env.NODE_ENV;
export const PORT = process.env.PORT;

export const JWT = {
  ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
};

export const DB = {
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PW: process.env.MONGO_PW,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
};

export const CORS_URL = process.env.CORS_URL;

export const CDN = {
  DIGITALOCEAN_ACCESSKEY_ID: process.env.DIGITALOCEAN_ACCESSKEY_ID,
  DIGITALOCEAN_SECRET_ACCESSKEY: process.env.DIGITALOCEAN_SECRET_ACCESSKEY,
  DIGITALOCEAN_BUCKET: process.env.DIGITALOCEAN_BUCKET,
  DIGITALOCEAN_ENDPOINT: process.env.DIGITALOCEAN_ENDPOINT,
  DIGITALOCEAN_PERMISSION: process.env.DIGITALOCEAN_PERMISSION,
};
