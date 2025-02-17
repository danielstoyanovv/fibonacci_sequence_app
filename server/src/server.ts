"use strict";

import express from "express"
require('dotenv').config();
import database from "./config/database";
import { Request, Response } from "express"
import {RedisServerService} from "./services/RedisServerService";
import {FibonacciSequenceService} from "./services/FibonacciSequenceService";
import {number} from "./controllers/fibonacciSequenceController";
import cors from "cors"
import {
    STATUS_UNPROCESSABLE_ENTITY,
    STATUS_OK,
    STATUS_INTERNAL_SERVER_ERROR,
    MESSEGE_ERROR,
    MESSEGE_SUCCESS,
    MESSEGE_INTERNAL_SERVER_ERROR
} from "./constants/data";

const redisClient = new RedisServerService().getRedisClient
const fibonacciSequenceService = new FibonacciSequenceService
database.on("connect", (client: any) => {
    console.log("Postgres database established")
    client
        .query('CREATE TABLE IF NOT EXISTS values (number INT)')
        .catch((err: any) => console.error(err));
});

const app = express()

const port = process.env.BACKED_PORT || 4000
const API_PREFIX = process.env.API_PREFIX || "api"
const API_VERSION = process.env.API_VERSION || "v1"

app.use(express.json())

app.use(cors())

app.post("/" + API_PREFIX + "/" + API_VERSION + "/fibonacci-sequence-index-number", number)

app.get("/" + API_PREFIX + "/" + API_VERSION + "/values/all", async (req: Request, res: Response) => {
    try {
        const values = await database.query('SELECT * from values')
        res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: values.rows,
            message: ""
        })
    } catch (error) {
        console.log(error)
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({
            status: MESSEGE_ERROR,
            data: [],
            message: MESSEGE_INTERNAL_SERVER_ERROR
        });
    }
});
app.get("/" + API_PREFIX + "/" + API_VERSION + "/values/current", async (req: Request, res: Response) => {
    const values = await redisClient.hGetAll("values")
    try {
        res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: values,
            message: ""
        })
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({
            status: MESSEGE_ERROR,
            data: []
        })
    }
});

app.post("/" + API_PREFIX + "/" + API_VERSION + "/values", async (req: Request, res: Response) => {
    try {
        const { number } = req.body
        if (parseInt(number) > 40) {
            return res.status(STATUS_UNPROCESSABLE_ENTITY).json({
                status: MESSEGE_ERROR,
                data: [],
                message: "number is too high"
            })
        }
        await redisClient.hSet('values', number, fibonacciSequenceService.fib(number));
        await database.query('INSERT INTO values(number) VALUES ($1)', [number])
        return res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: [],
            message: ""
        })
    } catch (error) {
        console.log(error)
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({
            status: MESSEGE_ERROR,
            data: [],
            message: MESSEGE_INTERNAL_SERVER_ERROR
        });
    }

});

app.listen(port, () => {
    console.log('listening on port', port)
})

