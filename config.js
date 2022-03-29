"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, NODE_ENV, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_USER, POSTGRES_PASSWORD, BCRYPT_PASSWORD, SALT_ROUNDS, JWT_TOKEN } = process.env;
exports.default = {
    port: PORT,
    database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
    dbHost: POSTGRES_HOST,
    dbPort: POSTGRES_PORT,
    user: POSTGRES_USER,
    dbPass: POSTGRES_PASSWORD,
    pepper: BCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
    jwtToken: JWT_TOKEN
};
