"use strict";
export class FibonacciSequenceService {
    /**
     * Get fib number
     * @return {number}
     */
     fib(index: number): any {
        if (index < 2) return 1
        return this.fib(index - 1) + this.fib(index - 2)
    }
}