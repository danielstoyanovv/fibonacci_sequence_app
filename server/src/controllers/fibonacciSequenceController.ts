"use strict";

import { Request, Response } from "express"
import {
    STATUS_SUCCESS,
    STATUS_ERROR,
    INTERNAL_SERVER_ERROR } from "../constants/data"
import {FibonacciSequenceService} from "../services/FibonacciSequenceService";

const fibonacciSequenceService = new FibonacciSequenceService

export const number = async ( req: Request,  res: Response) => {
    try {
        const { number } = req.body
        const fibonacciSequenceIndexNumber = fibonacciSequenceService.fib(number)
        res.status(200).json({
            status: STATUS_SUCCESS,
            data: {
                fibonacciSequenceIndexNumber
            },
            message: ""
        })
    } catch (error) {
        res.status(500).json({
            status: STATUS_ERROR,
            data: [],
            message: INTERNAL_SERVER_ERROR
        });
    }
}