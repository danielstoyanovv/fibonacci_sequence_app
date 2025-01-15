"use strict";

import express from "express"
import {config} from "dotenv"
config()
const pgClient = require('./config/pgClient');
import { Request, Response } from "express"
import {RedisServerService} from "./services/RedisServerService";
import {FibonacciSequenceService} from "./services/FibonacciSequenceService";
import {number} from "./controllers/fibonacciSequenceController";
import cors from "cors"
import {
    INTERNAL_SERVER_ERROR,
    STATUS_ERROR,
    STATUS_SUCCESS} from "./constants/data";

const redisClient = new RedisServerService().getRedisClient
const fibonacciSequenceService = new FibonacciSequenceService

pgClient
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')

const app = express()

const port = process.env.BACKED_PORT || 4000
const API_PREFIX = process.env.API_PREFIX || "api"
const API_VERSION = process.env.API_VERSION || "v1"

app.use(express.json())

app.use(cors())

app.post("/" + API_PREFIX + "/" + API_VERSION + "/fibonacci-sequence-index-number", number)

app.get('/', (req: Request, res: Response) => {
    res.json({mssg: 'Welcome to the app'})
})

app.get("/" + API_PREFIX + "/" + API_VERSION + "/values/all", async (req: Request, res: Response) => {
    try {
        const values = await pgClient
            .query('SELECT * from values')
        res.status(200).json({
            status: STATUS_SUCCESS,
            data: values.rows,
            message: ""
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: STATUS_ERROR,
            data: [],
            message: INTERNAL_SERVER_ERROR
        });
    }
});
app.get("/" + API_PREFIX + "/" + API_VERSION + "/values/current", async (req: Request, res: Response) => {
    try {
        const values = redisClient.hGetAll("values")
        values.then(function (result: any) {
            res.status(200).json({
                status: STATUS_SUCCESS,
                data: result,
                message: ""
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: STATUS_ERROR,
            data: [],
            message: INTERNAL_SERVER_ERROR
        });
    }
});

app.post("/" + API_PREFIX + "/" + API_VERSION + "/values", async (req: Request, res: Response) => {
    try {
        const number = req.body.number
        if (parseInt(number) > 40) {
            return res.status(422).json({
                status: STATUS_ERROR,
                data: [],
                message: "number is too high"
            })
        }
        redisClient.hSet('values', number, fibonacciSequenceService.fib(number));
        pgClient.query('INSERT INTO values(number) VALUES ($1)', [number])
        return res.status(200).json({
            status: STATUS_SUCCESS,
            data: [],
            message: ""
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: STATUS_ERROR,
            data: [],
            message: INTERNAL_SERVER_ERROR
        });
    }

});

app.listen(port, () => {
    console.log('listening on port', port)
})

