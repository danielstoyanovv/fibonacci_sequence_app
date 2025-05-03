"use strict";

import express from "express"
import "express-async-errors"
require('dotenv').config();
import database from "./config/database";
import cors from "cors"
import helmet from "helmet";
import {DatabaseConnectionError} from "./errors/database-connection-error";
import {errorHandler} from "./middlewares/error-handler";
import {numberRouter} from "./routes/number";

database
    .query('CREATE TABLE IF NOT EXISTS values (' +
        'id SERIAL PRIMARY KEY, ' +
        'number INT, ' +
        'fibonacci_index_number INT, ' +
        'created_at Date)')
    .catch((err: any) => {throw new DatabaseConnectionError(err)});
console.log("Postgres database connection established")

const app = express()

const port = process.env.BACKED_PORT || 4000

app.use(express.json())

app.use(cors())

app.use(helmet())

app.use(numberRouter)
app.use(errorHandler)
//
// app.post("/" + API_PREFIX + "/" + API_VERSION + "/fibonacci-sequence-index-number", number)
//
// app.get("/" + API_PREFIX + "/" + API_VERSION + "/values/all", getDatabaseValuesFromCache, values)
//
// app.get("/" + API_PREFIX + "/" + API_VERSION + "/values/current", current)
//
// app.post("/" + API_PREFIX + "/" + API_VERSION + "/values", createValue)
app.listen(port, () => {
    console.log('listening on port', port)
})