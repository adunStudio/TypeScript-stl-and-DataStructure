/// <reference path="API.ts" />

// Iterator definitions

namespace std {
    /**
     * Bi-directional iterator.
     * 양방향 이터레이터
     *
     * {@link Iterator Bidirectional iterators} are iterators that can be used to access the sequence of elements in a range in both directions (towards the end and towards the beginning)
     * {@link Iterator Bidirectinal iterators} 양쪽 방향으로 범위내 요소의 시퀀스에 액세스 할 수 있는 이터레이터(towards the end & towards the beginning).
     *
     * There is not a single type of {@link Iterator bidirectional iterator}: {@link IContainer Each container}
     * may define its own specific iterator type able to iterate through it and access its elements.
     * 싱글 타입은 없다. {@link Iterator bidirectional iterator}: {@link IContainer Each container}
     * 그것을 통해 반복 할 특별한 반복자 타입을 정의하고 그 요소에 access 할 수 있다.
     */

    export abstract class Iterator<T> {
        /**
         * Source container of the iterator is directing for.
         * 반복자의 소스 컨테이너에 대한 지시
         */
        protected _source: base.IContainer<T>;

        /* ---------------------------------------------------------
         CONSTRUCTORS
         --------------------------------------------------------- */
        /**
         * Construct from the source {@link IContainer container}.
         * 소스에서 생성한다.
         * @param source
         */
        public constructor(source: base.IContainer<T>) {
            this._source = source;
        }

        /* ---------------------------------------------------------
         MOVERS
         --------------------------------------------------------- */
        /**
         * C++/STL        TypeScript-STL
         * operator--     prev
         *
         * Get iterator to previous element.
         * 이전 요소에 대한 반복자를 가져온다.
         * If current iterator is first item(equal with {@link IContainer.begin IContainer.begin()}),
         * 현재 반복자가 첫 번째 항목인 경우
         * returns {@link IContainer.end IContainer.end()}.
         *
         * @return An iterator of the previous item.
         * 이전 항목의 반복자를 반환한다.
         */
        public abstract prev(): Iterator<T>;

        /**
         * C++/STL        TypeScript-STL
         * operator++     next
         *
         * Get iterator to next element.
         * 다음 요소에 대한 반복자를 가져온다.
         * If current iterator is last item,
         * 현재 반복자가 마지막 항목인 경우
         * returns {@link IContainer.end IContainer.end()}.
         *
         * @return An iterator of the previous item.
         * 이전 항목의 반복자를 반환한다.
         */
        public abstract next(): Iterator<T>;


        /**
         * Advances the {@link Iterator} by <i>n</i> element positions.
         * 요소의 포지션(n)에 의해 반복자를 전진한다.
         *
         * @param n Number of element positions to advance.
         * @return An advanced iterator.
         */
        public advance(n: number): Iterator<T> {
            let it: Iterator<T> = this;
            let i: number;

            if( n >= 0 )
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

            return it
        }

        /* ---------------------------------------------------------
         ACCESSORS
         --------------------------------------------------------- */

        /**
         * Get source
         *
         * @returns {base.IContainer<T>}
         */
        public get_source(): base.IContainer<T> {
            return this._source;
        }

        /**
         * C++/STL        TypeScript-STL
         * operator==     equal_to
         *
         * Whether an iterator is equal with the iterator.
         * 반복자가 동등한지 아닌지
         * Compare two iterators and returns whether they are equal or not.
         * 두개의 반복자를 비교하고 동등한지 아닌지 리턴한다.
         *
         * Note
         * Iterator's equal_to() only compare source container and index number.
         * Although elements in a pair, key and value are equal_to, if the source map or index number is different, then the {@link equal_to equal_to()} will return false.
         * If you want to compare the elements of a pair, compare them directly by yourself.
         * 반복자의 equal_to() 메서드는 오직 소스콘테이너와 인덱스 넘버를 비교한다.
         * 요소의 한쌍(key, value)가 같을 지라도 만약 소으 맵이나 인덱스 넘버가 다를경우 false
         *
         * @param obj An iteraotr to compare
         * @returns {boolean}
         */
        public equal_to<U extends T>(obj: Iterator<U>): boolean {
            return this._source == obj._source;
        }

        /**
         * Get value of the iterator is pointing.
         *
         * @return A value of the iterator.
         */
        public get value(): T {
            throw new Error('ddd');
        }

        public abstract swap(obj: Iterator<T>): void;

    }


}