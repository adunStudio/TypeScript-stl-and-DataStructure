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
         * 첫 번째 위치에 데이터를 추가한다.
         *
         * @param val
         */
        push_front(val: T): void;

        /**
         * Delete first element
         *
         * 첫 번째 위치의 데이터를 삭제한다.
         */
        pop_front(): void;
    }
}