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
import {valuesRouter} from "./routes/values";
import {currentRouter} from "./routes/current";
import {createValueRouter} from "./routes/createValue";

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

app.use(createValueRouter)
app.use(currentRouter)
app.use(valuesRouter)
app.use(numberRouter)
app.use(errorHandler)

app.listen(port, () => {
    console.log('listening on port', port)
})