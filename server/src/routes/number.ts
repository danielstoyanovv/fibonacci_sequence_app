"use strict";

import express, {Request, Response} from "express";
import { body } from "express-validator";

import { validateRequest } from "../middlewares/validate-request";
import {MESSEGE_SUCCESS, STATUS_OK} from "../constants/data";
import {FibonacciSequenceService} from "../services/FibonacciSequenceService";

const router = express.Router()

router.post("/api/fibonacci-sequence-index-number", [
    body("number")
        .trim()
        .notEmpty()
        .isNumeric()
        .withMessage("Number must be numeric value"),
    validateRequest

], async (req: Request, res: Response) => {
    const { number } = req.body
    const fibonacciSequenceIndexNumber = await FibonacciSequenceService.fib(number)
    res.status(STATUS_OK).json({
        status: MESSEGE_SUCCESS,
        data: {
            fibonacciSequenceIndexNumber
        },
        message: ""
    })

})

export { router as numberRouter }