"use strict";

import express, {Request, Response} from "express";
import {MESSEGE_SUCCESS, STATUS_OK} from "../constants/data";
import {RedisServerService} from "../services/RedisServerService";

const router = express.Router()
router.get("/api/values/current", [

], async (req: Request, res: Response) => {
    const redisClient = new RedisServerService().getRedisClient
    const values = await redisClient.hGetAll("values")
    res.status(STATUS_OK).json({
        status: MESSEGE_SUCCESS,
        data: values,
        message: ""
    })
})

export { router as currentRouter }