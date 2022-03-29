import dotenv from 'dotenv';

dotenv.config();
const { 
    PORT,
    NODE_ENV,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    JWT_TOKEN
 } = process.env;

export default {
  port:PORT,
  database:NODE_ENV==='dev'? POSTGRES_DB:POSTGRES_DB_TEST,
  dbHost:POSTGRES_HOST,
  dbPort:POSTGRES_PORT,
  user:POSTGRES_USER,
  dbPass:POSTGRES_PASSWORD,
  pepper: BCRYPT_PASSWORD,
  salt:SALT_ROUNDS,
  jwtToken:JWT_TOKEN
};
