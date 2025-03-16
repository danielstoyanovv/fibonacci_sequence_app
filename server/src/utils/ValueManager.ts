"use strict";

import database from "../config/database";
import {FibonacciSequenceService} from "../services/FibonacciSequenceService";
const fibonacciSequenceService = new FibonacciSequenceService()

export class ValueManager {
    #id: number
    #number: number

    /**
     * Set value id
     * @param {number} id
     * @return {this}
     */
    setId(id: number) {
        this.#id = id
        return this
    }

    /**
     * Get value id
     * @return {number}
     */
    getId() {
        return this.#id
    }

    /**
     * Set value number
     * @return {this}
     */
    setNumber(number: number) {
        this.#number = number
        return this
    }

    /**
     * Get number
     * @return {number}
     */
    getNumber() {
        return this.#number
    }

    /**
     * Create value
     * @return {void}
     */
    async createValue() {
        const createdAt = new Date()
        await database.query('INSERT INTO values(id, number, fibonacci_index_number, created_at) ' +
            'VALUES ($1, $2, $3, $4)',
            [this.getId(), this.getNumber(), fibonacciSequenceService.fib(this.getNumber()), createdAt])
    }
}