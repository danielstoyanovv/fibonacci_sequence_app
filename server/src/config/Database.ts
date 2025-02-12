"use strict";

import {Pool} from "pg";
require('dotenv').config();
class Database {
    private static _instance: Database;
    constructor() {
        // Postgres Client Setup
        const DB_NAME = process.env.NODE_ENV === 'test' ? process.env.PG_DB +  "_test" : process.env.PG_DB
        new Pool({
            user: process.env.PG_USER || "postgres",
            host: process.env.PG_HOST || "127.0.0.1",
            database: DB_NAME || "application",
            password: process.env.PG_PASSWORD || "PASSWORD",
            port: 5432,
        })
        console.log("Database connection initialized");
    }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new Database();
        return this._instance;
    }
}
module.exports = Database