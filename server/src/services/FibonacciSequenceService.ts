"use strict";
export class FibonacciSequenceService {
    /**
     * Get fib number
     * @return {number}
     */
     static async fib(index: number): Promise<number> {
        if (index < 2) return 1
        return await this.fib(index - 1) + await this.fib(index - 2)
    }
}