"use strict";

const { Pool } = require('pg');
require('dotenv').config();

const  pgClient = new Pool({
    user: process.env.PG_USER || "postgres",
    host: process.env.PG_HOST || "127.0.0.1",
    database: process.env.PG_DB || "application",
    password: process.env.PG_PASSWORD || "PASSWORD",
    port: process.env.PG_PORT || 5432,
    ssl:
        process.env.NODE_ENV !== 'production'
            ? false
            : { rejectUnauthorized: false },
});

module.exports = {
    query: (text: any, params: any) => pgClient.query(text, params)
};