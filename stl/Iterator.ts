
/// <reference path="API.ts" />

namespace std
{
    export abstract class Iterator<T>
    {
        /**
         * Bi-directional iterator
         * 양방향 반복자
         *
         * 반복자의 범주
         * 입력 반복자(Input-iterator): 현 위치의 원소를 한 번만 읽을 수 있는 반복자
         * 출력 반복자(Output-iterator): 현 위치의 원소를 한 번만 쓸수 있는 반복자
         * 순방향 반복자(Forward iterator): 입력, 출력 반복자 기능에 순방향으로 이동(++)이 가능한 재 할당될 수 있는 반복자
         * 양방향 반복자(Bi-directional iterator): 순방향 반복자 기능에 역방향으로 이동(--)이 가능한 반복자 (List, Set, Multiset, Map, multimap.....)
         * 임의 접근 박복자(Random access iterator): 양방향 반복자 기능에 +, -, +=, -=, [] 연산이 가능한 반복자(vector, deque)
         *
         * 모든 컨테이너는 양방향 반복자 이상을 제공한다.
         * 배열 기반 컨테이너인 vector와 deque는 임의 접근 반복자를 제공한다.
         *
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
         *
         * C++ 에서의 -- 연산자
         * 반복자의 이전 원소를 가리키도록 이동한다.
         */
        public abstract prev(): Iterator<T>;

        /**
         * Get iterator to next element
         *
         * C++ 에서의 ++ 연산자
         * 반복자의 다음 원소를 가리키도록 이동한다.
         */
        public abstract next(): Iterator<T>;

        /**
         * 반복자를 순회한다.
         *
         */
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
         * Iterator's equal_to() only compare source container and index number.
         *
         * C++ 에서의 == 연산자
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

        /**
         * 반복자를 교환한다.
         */
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

namespace std
{
    /* =========================================================
     GLOBAL FUNCTIONS
     - MOVERS
     - BEGIN
     - END
     ============================================================
     MOVERS
     --------------------------------------------------------- */

    export function distance<T, InputIterator extends Iterator<T>>
        (first: InputIterator, last: InputIterator): number
    {
        if( (<any>first).index != undefined )
        {
            // WHEN IARRAY_ITERATOR
            // ABS FOR REVERSE_ITERATOR
            return Math.abs((<any>last).index - (<any>first).index);
        }

         let length: number = 0;

        for( ; !first.equal_to(last); first = first.next() as InputIterator )
        {
            length ++;
        }

        return length;
    }

    export function advance<T, InputIterator extends Iterator<T>>
        (it: InputIterator, n: number): InputIterator
    {
        return it.advance(n) as InputIterator;
    }


}