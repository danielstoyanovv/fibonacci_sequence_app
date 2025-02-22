"use strict";

import { Request, Response } from "express"
import {
    STATUS_UNPROCESSABLE_ENTITY,
    STATUS_OK,
    STATUS_INTERNAL_SERVER_ERROR,
    MESSEGE_ERROR,
    MESSEGE_SUCCESS,
    MESSEGE_INTERNAL_SERVER_ERROR
} from "../constants/data"
import {FibonacciSequenceService} from "../services/FibonacciSequenceService";
import database from "../config/database";
import {RedisServerService} from "../services/RedisServerService";
import {LoggerService} from "../services/LoggerService";

const redisClient = new RedisServerService().getRedisClient
const logger = new LoggerService().createLogger()

const fibonacciSequenceService = new FibonacciSequenceService

export const number = async ( req: Request,  res: Response) => {
    try {
        const { number } = req.body
        const fibonacciSequenceIndexNumber = fibonacciSequenceService.fib(number)
        res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: {
                fibonacciSequenceIndexNumber
            },
            message: ""
        })
    } catch (error) {
        logger.error(error)
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({
            status: MESSEGE_ERROR,
            data: [],
            message: MESSEGE_INTERNAL_SERVER_ERROR
        });
    }
}
export const values = async ( req: Request,  res: Response) => {
    try {
        const values = await database.query('SELECT number from values')
        await redisClient.setEx("databaseValues", 600, JSON.stringify(values)); // Cache data for 10 minutes
        res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: values.rows,
            message: ""
        })
    } catch (error) {
        logger.error(error)
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({
            status: MESSEGE_ERROR,
            data: [],
            message: MESSEGE_INTERNAL_SERVER_ERROR
        });
    }
}
export const current = async ( req: Request,  res: Response) => {
    try {
        const values = await redisClient.hGetAll("values")
        res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: values,
            message: ""
        })

    } catch (error) {
        logger.error(error)
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({
            status: MESSEGE_ERROR,
            data: []
        })
    }
}
export const createValue = async ( req: Request,  res: Response) => {
    try {
        const { number } = req.body
        if (parseInt(number) > 40) {
            return res.status(STATUS_UNPROCESSABLE_ENTITY).json({
                status: MESSEGE_ERROR,
                data: [],
                message: "number is too high"
            })
        }
        await redisClient.hSet("values", number, fibonacciSequenceService.fib(number));
        await database.query('INSERT INTO values(number) VALUES ($1)', [number])
        await redisClient.del("databaseValues")
        return res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: [],
            message: ""
        })
    } catch (error) {
        logger.error(error)
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({
            status: MESSEGE_ERROR,
            data: [],
            message: MESSEGE_INTERNAL_SERVER_ERROR
        });
    }
}
