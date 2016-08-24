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
         */
        front(): T;

        /**
         * Access last element
         * Returns a value of the last element in the IList container
         */
        back(): T;


        /* ---------------------------------------------------------
         ELEMENTS I/O
         --------------------------------------------------------- */
        /**
         * Add element at the end
         */
        push_back(val: T): void;

        /**
         * Delete last element
         */
        pop_back(): void;


        /**
         * Insert an element
         * The IList container is extended by inserting new element before the element at the specified position,
         * effectively increasing the IList container size by one
         *
         * @param position
         * @param val
         */
        insert(position: Iterator<T>, val: T): Iterator<T>;

        /**
         * Insert elements by range iterators
         * The IList container is extended by inserting new elements before the element at the specified position,
         * effectively increasing the IList container size by the number of repeating elements
         *
         * @param position
         * @param n
         * @param val
         */
        insert(position: Iterator<T>, n: number, val: T): Iterator<T>;

        /**
         * Insert elements by range iterators
         *
         * @param position
         * @param begin
         * @param end
         */
        insert<U extends T, InputIterator extends Iterator<U>>
            (position: Iterator<T>, begin: InputIterator, end: InputIterator): Iterator<T>

    }
}