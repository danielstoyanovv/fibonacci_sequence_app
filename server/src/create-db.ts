"use strict";

const { Pool } = require('pg');
require('dotenv').config();

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
    .catch((err: any) => console.error(err))