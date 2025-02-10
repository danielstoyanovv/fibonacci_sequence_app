"use strict";

import { Request, Response } from "express"
import {
    STATUS_OK,
    STATUS_INTERNAL_SERVER_ERROR,
    MESSEGE_SUCCESS,
    MESSEGE_ERROR,
    MESSEGE_INTERNAL_SERVER_ERROR
} from "../constants/data"
import {FibonacciSequenceService} from "../services/FibonacciSequenceService";

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
        res.status(STATUS_INTERNAL_SERVER_ERROR).json({
            status: MESSEGE_ERROR,
            data: [],
            message: MESSEGE_INTERNAL_SERVER_ERROR
        });
    }
}