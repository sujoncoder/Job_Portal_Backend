import dotenv from "dotenv";
dotenv.config();


export const PORT = process.env.PORT || 8000;
export const DB = process.env.DATABASE_URL;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const EMAIL_REGEX = "/^[^\s@]+@[^\s@]+\.[^\s@0-9]+$/i";
export const PHOTO_PATH = "/public/images/users";
