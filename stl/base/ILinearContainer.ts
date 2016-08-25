/// <reference path="../API.ts" />

namespace std.base
{
    /**
     * An interface for linear containers
     */

    export interface ILinearContainer<T> extends IContainer<T>
    {
        /* ---------------------------------------------------------
         CONSTRUCTORS
         --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        assign<U extends T, InputIterator extends Iterator<U>>
            (begin: InputIterator, end: InputIterator): void;

        /**
         * Assign container content
         * Assign new contents to the IList container, replacing its current contents, and modifying its size accordingly
         *
         * 지정 개수만큼 특정 데이터로 채운다.
         *
         * @param n New size of the
         * @param val Value to fill the container with. Each of the n elements in the container will be initialize to a copy of the value
         */
        assign(n: number, val: T): void;


        /* ---------------------------------------------------------
         ACCESSORS
         --------------------------------------------------------- */
        /**
         * Access first element
         * Returns a value of the first element in the IList container
         *
         * 첫 번째 데이터의 참조를 리턴한다.
         */
        front(): T;

        /**
         * Access last element
         * Returns a value of the last element in the IList container
         *
         * 마지막 데이터의 참조를 리턴한다.
         */
        back(): T;


        /* ---------------------------------------------------------
         ELEMENTS I/O
         --------------------------------------------------------- */
        /**
         * Add element at the end
         *
         * 마지막 위치에 데이터를 추가한다.
         */
        push_back(val: T): void;

        /**
         * Delete last element
         *
         * 마지막 위치의 데이터를 삭제한다.
         */
        pop_back(): void;


        /**
         * @inheritdoc
         */
        insert(position: Iterator<T>, val: T): Iterator<T>;

        /**
         * Insert elements by range iterators
         * The IList container is extended by inserting new elements before the element at the specified position,
         * effectively increasing the IList container size by the number of repeating elements
         *
         * 지정한 위치에 지정된 개수만큼 데이터를 삽입한다.
         *
         * @param position
         * @param n
         * @param val
         */
        insert(position: Iterator<T>, n: number, val: T): Iterator<T>;

        /**
         * Insert elements by range iterators
         *
         * 지정된 위치에 지정된 범위의 데이터를 삽입한다.
         *
         * @param position
         * @param begin
         * @param end
         */
        insert<U extends T, InputIterator extends Iterator<U>>
            (position: Iterator<T>, begin: InputIterator, end: InputIterator): Iterator<T>

    }
}