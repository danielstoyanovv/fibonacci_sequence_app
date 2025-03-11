"use strict";

const { Pool } = require('pg');
require('dotenv').config();
import {LoggerService} from "./services/LoggerService";
import database from "./config/database";
const logger = new LoggerService().createLogger()

const DB_NAME = process.env.NODE_ENV === 'test' ? process.env.PG_DB +  "_test" : process.env.PG_DB
// Postgres Client Setup
const client = new Pool({
    user: process.env.PG_USER || "postgres",
    host: process.env.PG_HOST || "127.0.0.1",
    database: "postgres",
    password: process.env.PG_PASSWORD || "PASSWORD",
    port: process.env.PG_PORT || 5432,
    ssl:
        process.env.NODE_ENV !== 'production'
            ? false
            : { rejectUnauthorized: false },
});

client
    .query(`CREATE DATABASE ` + DB_NAME)
    .catch((err: any) => logger.error(err))
database.on("connect", (client: any) => {
    console.log("Postgres database established")
    client
        .query('CREATE TABLE IF NOT EXISTS values (id INT, number INT, fibonacci_index_number INT, created_at Date)')
        .catch((err: any) => logger.error(err));
});
