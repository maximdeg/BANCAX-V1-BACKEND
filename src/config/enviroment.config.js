import dotenv from "dotenv";

dotenv.config();

const ENV = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    DB_PASS: process.env.DB_PASS,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    GMAIL_PASS: process.env.GMAIL_PASS,
    GMAIL_USER: process.env.GMAIL_USER,
    URL_BACKEND: process.env.URL_BACKEND,
    URL_FRONTEND: process.env.URL_FRONTEND,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    INTERNAL_API_KEY: process.env.INTERNAL_API_KEY,
    JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
    CLOUD_API_ENV_VARIABLE: process.env.CLOUD_API_ENV_VARIABLE,
};

export default ENV;
