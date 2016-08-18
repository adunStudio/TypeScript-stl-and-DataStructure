/// <reference path="../API.ts" />

namespace std.base {

    /**
     * An interface for linear containers
     * 선형 컨테이너를 위한 인터페이스다.
     */
    export interface ILinearContainer<T> extends IContainer<T> {
        /* ---------------------------------------------------------
         CONSTRUCTORS
         --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        assign<U extends T, InputIterator extends Iterator<U>>
            (begin: InputIterator, end: InputIterator): void;


        /**
         * Assign container content.
         *
         * Assign container contents to the IList container, replacing its current contents,
         * and modifying its size accordingly.
         *
         * @param n new size for the
         * @param val Value to fill the container width. Each of the n elements in the container will be initialize to a copy of this value
         */
        assign(n: number, val: T): void;

        /* ---------------------------------------------------------
         ACCESSORS
         --------------------------------------------------------- */
        /**
         * Access first element
         * Returns a value of the first element in the IList container
         *
         * unlike member end(), which return an interator just past this element,
         * this function returns a direct value.
         *
         * Calling this function on an empty cause undefined behavior.
         *
         * @return A value of the first element of the IList container
         */
        front(): T;

        /**
         * Access last element
         * ..
         */
        back(): T;


        /* ---------------------------------------------------------
         ELEMENTS I/O
         --------------------------------------------------------- */
        /**
         * Add element at the end
         *
         * adds new element at the end of the IList container, after its current last element
         * This effectively increase the IList container size by one
         *
         * @param val Value to be copied to the new element
         */
        push_back(val: T): void;

        /**
         * Delete last lement
         */
        pop_back(): void;

        /**
         * Insert an element
         *
         */
        insert(position: Iterator<T>, val: T): Iterator<T>;

        /**
         * insert elements by range iterators
         */
        insert(position: IContainer<T>, n: number, val: T): Iterator<T>;

        insert<U extends T, InputIterator extends Iterator<U>>
            (position: Iterator<T>, begin: InputIterator, end: InputIterator): Iterator<T>;




    }
}