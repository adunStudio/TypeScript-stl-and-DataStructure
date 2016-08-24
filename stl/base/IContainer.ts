
/// <reference path="../API.ts" />

namespace std.base {
    import ReverseIterator = std.ReverseIterator;
    /**
     * An interface of containers.
     *
     * IContainer is an interface designed for sequence containers.
     * Sequence of STL are based on the IContainer
     */
    export interface IContainer<T>
    {
        /* ---------------------------------------------------------------
         SEMI-CONSTRUCTORS
         --------------------------------------------------------------- */
        /**
         * Assigns new contents to the container, replacing its current contents, and modifying it size accordingly.
         *
         * @param begin Input iterator of the initial position in a sequence
         * @param end   Input iterator of the final position in a sequence
         */
        assign<U extends T, InputIterator extends T>
            (begin: InputIterator, end: InputIterator): void;

        /**
         * Removes all elements from the Container, leaving the container with a size of 0
         */
        clear(): void;


        /* ---------------------------------------------------------------
         GETTERS
         --------------------------------------------------------------- */
        /**
         * Return iterator to beginning
         */
        begin(): Iterator<T>;

        /**
         * Return iterator to end
         */
        end(): Iterator<T>;

        /**
         * Return ReverseIterator to reverse beginning
         */
        rbegin(): base.IReverseIterator<T>;

        /**
         * Return ReverseIterator to reverse end
         */
        rend(): base.IReverseIterator<T>;

        /**
         * Return the number of elements in the Container
         */
        size(): number;

        /**
         * Test whether the container is empty
         */
        empty(): boolean;


        /* ---------------------------------------------------------------
         ELEMENTS I/O
         --------------------------------------------------------------- */
        /**
         * Insert elements
         * Appends new elements to the container, and returns the new size of the
         *
         * @param items
         *
         * @return New size of the Container
         */
        push<U extends T>(...items: U[]): number;

        /**
         * Insert an element
         * The container is extended by inserting a new element before the element at the specified position
         *
         * @param position  Position in the IContainer where the new element is inserted.
         * @param val       Value to be copied to the inserted elements
         *
         * @return An iterator that points th newly inserted element
         */
        insert(position: Iterator<T>, val: T): Iterator<T>;

        /**
         * Erase element
         * Removes from the container a single element
         *
         * @param position
         *
         * @return
         */
        erase(position: Iterator<T>): Iterator<T>;

        /**
         * Erase elements
         * Removes from the container a range of elements.
         *
         * @param begin An iterator specifying a range of beginning to erase
         * @param end An iterator specifying a range of end to erase.
         *
         * @return
         */
        erase(begin: Iterator<T>, end: Iterator<T>): Iterator<T>;


        /* ---------------------------------------------------------------
         UTILITIES
         --------------------------------------------------------------- */
        /**
         * Swap content.
         * @param obj
         */
        swap(obj: IContainer<T>): void;
    }

    export interface IReverseIterator<T> extends ReverseIterator<T, Iterator<T>, IReverseIterator<T>>
    {

    }
}