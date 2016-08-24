/// <reference path="../API.ts" />

namespace std.base
{
    /**
     * An abstract container
     */

    export abstract class Container<T> implements IContainer<T>
    {
        /* =========================================================
         CONSTRUCTORS & SEMI-CONSTRUCTORS
         - CONSTRUCTORS
         - ASSIGN & CLEAR
         ============================================================
         CONSTURCTORS
         --------------------------------------------------------- */
        /**
         * Default Constructor
         */
        public constructor();

        /**
         * Initialize list Constructor
         * Constructs a container with a copy of each of the elements in array, in the same order
         *
         * @para array An array containing elements to be copied and contained
         */
        public constructor(array: Array<T>);

        /**
         * Copy constructor
         * Constructs a container with a copy of each of the elements in container, in the saome order
         *
         * @param container Another container object of same type
         */
        public constructor(container: IContainer<T>);

        /**
         * Range constructor
         * Constructs a container with as many elements as the range begin ~ end
         *
         * @param begin Input iterator of the initial position in a sequence
         * @param end   Input iterator of the final position in a sequence
         */
        public constructor(begin: Iterator<T>, end: Iterator<T>);

        public constructor(...args: any[])
        {
            // THIS IS ABSTRACT CLASS
            // NOTHING TO DO ESPECIALLY
        }


        /* ---------------------------------------------------------
         ASSIGN & CLEAR
         --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public abstract assign<U extends T, InputIterator extends Iterator<U>>
        (begin: InputIterator, end: InputIterator): void;

        /**
         * @inheritdoc
         */
        public clear(): void
        {
            this.erase(this.begin(), this.end());
        }


        /* ---------------------------------------------------------------
         GETTERS
         --------------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public abstract begin(): Iterator<T>;

        /**
         * @inheritdoc
         */
        public abstract end(): Iterator<T>;

        /**
         * @inheritdoc
         */
        public abstract rbegin(): base.IReverseIterator<T>;

        /**
         * @inheritdoc
         */
        public abstract rend(): base.IReverseIterator<T>;

        /**
         * @inheritdoc
         */
        public abstract size(): number;

        /**
         * @inheritdoc
         */
        public empty(): boolean
        {
            return this.size() == 0;
        }


        /* =========================================================
         ELEMENTS I/O
         - INSERT
         - ERASE
         ============================================================
         INSERT
         --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public abstract push<U extends T>(...items: U[]): number;

        /**
         * @inheritdoc
         */
        public abstract insert(position: Iterator<T>, val: T): Iterator<T>;


        /* ---------------------------------------------------------
         ERASE
         --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public abstract erase(position: Iterator<T>): Iterator<T>;

        /**
         * @inheritdoc
         */
        public abstract erase<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;


        /* ---------------------------------------------------------------
         UTILITIES
         --------------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public abstract swap(obj: IContainer<T>): void;
    }
}