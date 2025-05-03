"use strict";

import express, {Request, Response} from "express";

import {MESSEGE_SUCCESS, STATUS_OK} from "../constants/data";
import {getDatabaseValuesFromCache} from "../middlewares/getDatabaseValuesFromCache";
import database from "../config/database";
import {RedisServerService} from "../services/RedisServerService";

const router = express.Router()
router.get("/api/values/all", [
    getDatabaseValuesFromCache

], async (req: Request, res: Response) => {
    const values = await database.query('SELECT number, fibonacci_index_number from values')
    const redisClient = new RedisServerService().getRedisClient
    await redisClient.setEx("databaseValues", 600, JSON.stringify(values)); // Cache data for 10 minutes
    res.status(STATUS_OK).json({
        status: MESSEGE_SUCCESS,
        data: values.rows,
        message: ""
    })
})

export { router as valuesRouter }