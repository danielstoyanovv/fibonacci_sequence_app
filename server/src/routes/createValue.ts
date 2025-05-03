"use strict";

import express, {Request, Response} from "express";
import { body } from "express-validator";

import { validateRequest } from "../middlewares/validate-request";
import {
    MESSEGE_SUCCESS,
    STATUS_OK
} from "../constants/data";
import {FibonacciSequenceService} from "../services/FibonacciSequenceService";
import {RedisServerService} from "../services/RedisServerService";
import {ValueManager} from "../utils/ValueManager";

const router = express.Router()

router.post("/api/values", [
    body("number")
        .trim()
        .notEmpty()
        .isNumeric()
        .withMessage("Number must be numeric value"),
    validateRequest

], async (req: Request, res: Response) => {
    const { number } = req.body
    const redisClient = new RedisServerService().getRedisClient
    await redisClient.hSet("values", number, await FibonacciSequenceService.fib(number));

    const id = Math.floor(Math.random() * 10000)
    const manager = new ValueManager()
    await manager
        .setId(id)
        .setNumber(number)
        .createValue()
    await redisClient.del("databaseValues")
    return res.status(STATUS_OK).json({
        status: MESSEGE_SUCCESS,
        data: [],
        message: ""
    })
})

export { router as createValueRouter }