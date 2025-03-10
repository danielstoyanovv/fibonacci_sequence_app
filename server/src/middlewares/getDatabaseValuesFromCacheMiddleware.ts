"use strict";

import {
    Request,
    Response,
    NextFunction
} from "express";
import {
    MESSEGE_SUCCESS,
    STATUS_OK
} from "../constants/data"
import {RedisServerService} from "../services/RedisServerService";
export const getDatabaseValuesFromCacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const redisClient = new RedisServerService().getRedisClient
    const cachedData = await redisClient.get("databaseValues");
    if (cachedData) {
        const values = JSON.parse(cachedData)
        console.log('Cache hit');
        return res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: values.rows,
            message: ""
        })
    }
    console.log('Cache miss');
    next();
}