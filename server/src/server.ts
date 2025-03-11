"use strict";

import express from "express"
require('dotenv').config();
import database from "./config/database";
import {
    number,
    values,
    current,
    createValue
} from "./controllers/fibonacciSequenceController";
import cors from "cors"
import {getDatabaseValuesFromCacheMiddleware} from "./middlewares/getDatabaseValuesFromCacheMiddleware";
import {LoggerService} from "./services/LoggerService";
import helmet from "helmet";

const logger = new LoggerService().createLogger()
database.on("connect", (client: any) => {
    console.log("Postgres database established")
    client
        .query('CREATE TABLE IF NOT EXISTS values (id INT, number INT, fibonacci_index_number INT, created_at Date)')
        .catch((err: any) => logger.error(err));
});

const app = express()

const port = process.env.BACKED_PORT || 4000
const API_PREFIX = process.env.API_PREFIX || "api"
const API_VERSION = process.env.API_VERSION || "v1"

app.use(express.json())

app.use(cors())

app.use(helmet())

app.post("/" + API_PREFIX + "/" + API_VERSION + "/fibonacci-sequence-index-number", number)

app.get("/" + API_PREFIX + "/" + API_VERSION + "/values/all", getDatabaseValuesFromCacheMiddleware, values)

app.get("/" + API_PREFIX + "/" + API_VERSION + "/values/current", current)

app.post("/" + API_PREFIX + "/" + API_VERSION + "/values", createValue)
app.listen(port, () => {
    console.log('listening on port', port)
})