/// <reference path="../API.ts" />

namespace std.base {

    /**
     * An abstract container
     * 추상 컨테이너
     *
     * @param <T> TYpe of elements
     */

    export abstract class Container<T> implements IContainer<T> {

        /* =========================================================
         CONSTRUCTORS & SEMI-CONSTRUCTORS
         - CONSTRUCTORS
         - ASSIGN & CLEAR
         ============================================================
         CONSTURCTORS
         --------------------------------------------------------- */
        /**
         * Default Constructor.
         *
         * Constructs an empty container, with no elements
         */
        public constructor();

        /**
         * Initializer list Constructor.
         *
         * Constructs a container with a copy of each of the elements in array, in the same order
         *
         * @param array An Array containing elements to be copied and contained.
         */
        public constructor(array: Array<T>);

        /**
         * Copy Constructor.
         *
         * Constructs a container with a copy of each of the elements in container, in the same order
         *
         * @param container Another container object of the same type
         */
        public constructor(container: IContainer<T>);

        /**
         * Range Constructor.
         *
         * Constructs a container with as many lements as the range begin, and,with each element
         */
        public constructor(begin: Iterator<T>, end: Iterator<T>);

        public constructor(...args: any[]) {
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
        public abstract clear(): void;

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
       /* public swap(obj: IContainer<T>): void {
            let supplement: Vector<T> = new Vector<T>(this.begin(), this.end());

            this.assign(obj.begin(), obj.end());
            obj.assign(supplement.begin(), supplement.end());
        }*/

        public abstract swap(obj: IContainer<T>): void
    }
}