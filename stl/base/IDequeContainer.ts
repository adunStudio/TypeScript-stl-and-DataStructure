/// <reference path="../API.ts" />

namespace std.base
{
    /**
     * An interface for deque
     */

    export interface IDequeContainer<T> extends ILinearContainer<T>
    {
        /**
         * Insert element at beginning
         *
         * @param val
         */
        push_front(val: T): void;

        /**
         * Delete first element
         */
        pop_front(): void;
    }
}