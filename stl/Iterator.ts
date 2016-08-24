
/// <reference path="API.ts" />

namespace std
{
    export abstract class Iterator<T>
    {
        /**
         * Bi-directional iterator
         *
         * Iterator(Bi-directional iterator) are iterators that can be used to access the sequence of elements in a
         * range in both directions (towards the end and towards the beginning)
         *
         * There is not a single type of Iterator
         * Each container may define its own specific iterator type able to iterate through it and access its elements.
         */

        /**
         * Source container
         */
        protected _source: base.IContainer<T>;


        /* ---------------------------------------------------------
         CONSTRUCTORS
         --------------------------------------------------------- */

        /**
         * Construct from the source(IContainer container)
         */
        public constructor(source: base.IContainer<T>)
        {
            this._source = source;
        }


        /* ---------------------------------------------------------
         MOVERS
         --------------------------------------------------------- */

        /**
         * Get iterator to previous element
         */
        public abstract prev(): Iterator<T>;

        /**
         * Get iterator to next element
         */
        public abstract next(): Iterator<T>;

        public advance(n: number): Iterator<T>
        {
            let it: Iterator<T> = this;
            let i: number;

            if( n > 0 )
            {
                for( i = 0; i < n; ++i )
                {
                    if( it.equal_to(this._source.end()) )
                    {
                        return this._source.end();
                    }
                    else
                    {
                        it = it.next();
                    }
                }
            }
            else
            {
                n = n * -1;

                for( i = 0; i < n; ++i )
                {
                    if( it.equal_to(this._source.end()) )
                    {
                        return this._source.end();
                    }
                    else
                    {
                        it = it.prev();
                    }
                }
            }

            return it;
        }


        /* ---------------------------------------------------------
         ACCESSORS
         --------------------------------------------------------- */

        /**
         * Get source
         */
        public get_source(): base.IContainer<T>
        {
            return this._source;
        }

        /**
         * Whether an iterator is equal with the iterator.
         * Compare two iterators and returns whether they are equal or not
         *
         * Iterator's equal_to() only compare souce container and index number.
         *
         * @param obj
         * @returns {boolean}
         */
        public equal_to<U extends T>(obj: Iterator<U>): boolean
        {
            return this._source == obj._source;
        }

        public get value(): T
        {
            throw new Error('Have to be overriden.');
        }

        public abstract swap(obj: Iterator<T>): void;
    }
}



namespace std
{
    /**
     * This class reverses the direction in which a bidirectional or random-access iterator iterates through a range
     */
    export abstract class ReverseIterator<T, Base extends Iterator<T>, This extends ReverseIterator<T, Base, This>> extends Iterator<T>
    {
        protected _base: Base;

        /* ---------------------------------------------------------
         CONSTRUCTORS
         --------------------------------------------------------- */
        /**
         * Construct from base iterator
         *
         * @param base A reference of the base iterator, which iterates in the opposite direction
         */
        public constructor(base: Base)
        {
            if( base == null )
            {
                super(null);
            }
            else
            {
                super(base.get_source());
                this._base = base.prev() as Base;
            }
        }

        /**
         * Return base iterator
         *
         * @returns base A reference of the base iterator, which iterates in the opposite direction
         */
        public base(): Base
        {
            return this._base.next() as Base;
        }

        /**
         * CREATE A NEW OBJECT WiTH SAME TYPE
         */
        protected abstract create_neighbor(): This;


        /* ---------------------------------------------------------
         ACCESSORS
         --------------------------------------------------------- */

        /**
         * Get value of the iterator is pointing
         *
         * @return value
         */
        public get value(): T {
            return this._base.value;
        }

        /* ---------------------------------------------------------
         MOVERS
         --------------------------------------------------------- */

        /**
         * @inheritdoc
         */
        public prev(): This
        {
            let ret = this.create_neighbor();
            ret._source = this._source;
            ret._base = this._base.next() as Base;

            return ret;
        }

        /**
         * @inheritdoc
         */
        public next(): This
        {
            let ret = this.create_neighbor();
            ret._source = this._source;
            ret._base = this._base.next() as Base;

            return ret;
        }


        /**
         * @inheritdoc
         */
        public advance(n: number): This
        {
            let ret = this.create_neighbor();
            ret._source = this._source;
            ret._base = this._base.advance(-n) as Base;

            return ret;
        }

        /* ---------------------------------------------------------
         COMPARES
         --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public equal_to(obj: This): boolean
        {
            return this._base.equal_to(obj._base);
        }

        /**
         * @inheritdoc
         */
        public swap(obj: This): void
        {
            this._base.swap(obj._base);
        }
    }
}