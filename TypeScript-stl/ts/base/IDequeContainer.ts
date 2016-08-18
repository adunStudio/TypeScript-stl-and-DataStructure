/// <reference path="../API.ts" />

namespace std.base {

    /**
     * An interface for deque
     */
    export interface IDequeContainer<T> extends ILinearContainer<T> {

        push_fornt(val: T): void;

        pop_front(): void;
    }
}