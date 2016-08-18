/// <reference path="API.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// Iterator definitions
var std;
(function (std) {
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
    var Iterator = (function () {
        /* ---------------------------------------------------------
         CONSTRUCTORS
         --------------------------------------------------------- */
        /**
         * Construct from the source {@link IContainer container}.
         * 소스에서 생성한다.
         * @param source
         */
        function Iterator(source) {
            this._source = source;
        }
        /**
         * Advances the {@link Iterator} by <i>n</i> element positions.
         * 요소의 포지션(n)에 의해 반복자를 전진한다.
         *
         * @param n Number of element positions to advance.
         * @return An advanced iterator.
         */
        Iterator.prototype.advance = function (n) {
            var it = this;
            var i;
            if (n >= 0) {
                for (i = 0; i < n; ++i) {
                    if (it.equal_to(this._source.end())) {
                        return this._source.end();
                    }
                    else {
                        it = it.next();
                    }
                }
            }
            else {
                n = n * -1;
                for (i = 0; i < n; ++i) {
                    if (it.equal_to(this._source.end())) {
                        return this._source.end();
                    }
                    else {
                        it = it.prev();
                    }
                }
            }
            return it;
        };
        /* ---------------------------------------------------------
         ACCESSORS
         --------------------------------------------------------- */
        /**
         * Get source
         *
         * @returns {base.IContainer<T>}
         */
        Iterator.prototype.get_source = function () {
            return this._source;
        };
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
        Iterator.prototype.equal_to = function (obj) {
            return this._source == obj._source;
        };
        Object.defineProperty(Iterator.prototype, "value", {
            /**
             * Get value of the iterator is pointing.
             *
             * @return A value of the iterator.
             */
            get: function () {
                throw new Error('ddd');
            },
            enumerable: true,
            configurable: true
        });
        return Iterator;
    }());
    std.Iterator = Iterator;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * this class reverse the direction in which a bidirectional or random-access iterator iterates through a range.
     * 이 클래스는 범위를 통해 양방향 또는 랜덤 엑세스 반복자의 방향을 바꾼다.
     *
     * A copy of the original iterator(the {@link Iterator base iterator}) is kept internally and used to reflect the operations performed on the {@link ReverseIterator} :
     * 오리지널 반복자의 복사본은 내부적으로 유지하고 operation을 수행할 때 쓰인다.
     */
    var ReverseIterator = (function (_super) {
        __extends(ReverseIterator, _super);
        /* ---------------------------------------------------------
         CONSTRUCTORS
         --------------------------------------------------------- */
        /**
         * Construct from base iterator.
         *
         * @param base A reference of the base iterator, which iterates in the opposite direction.
         */
        function ReverseIterator(base) {
            if (base == null) {
                _super.call(this, null);
            }
            else {
                _super.call(this, base.get_source());
                this._base = base.prev();
            }
        }
        /**
         * Return base iterator.
         *
         * The base iterator is an iterator of the same type as the on use to construct the ReverseIterator,
         * but pointing to the element next to the one the {@link ReverseIterator} is currently pointing to
         * (a {@link ReverseIterator} has always an offset of -1 with respect to its base iterator).
         */
        ReverseIterator.prototype.base = function () {
            return this._base.next();
        };
        Object.defineProperty(ReverseIterator.prototype, "value", {
            /* ---------------------------------------------------------
             ACCESSORS
             --------------------------------------------------------- */
            /**
             * <p> Get value of the iterator is pointing. </p>
             *
             * @return A value of the reverse iterator.
             */
            get: function () {
                return this._base.value;
            },
            enumerable: true,
            configurable: true
        });
        /* ---------------------------------------------------------
         MOVERS
         --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        ReverseIterator.prototype.prev = function () {
            var ret = this.create_neighbor();
            ret._base = this._base.next();
            return ret;
        };
        ReverseIterator.prototype.next = function () {
            var ret = this.create_neighbor();
            ret._source = this._source;
            ret._base = this._base.next();
            return ret;
        };
        ReverseIterator.prototype.advance = function (n) {
            var ret = this.create_neighbor();
            ret._source = this._source;
            ret._base = this._base.advance(-n);
            return ret;
        };
        /* ---------------------------------------------------------
         COMPARES
         --------------------------------------------------------- */
        ReverseIterator.prototype.equal_to = function (obj) {
            return this._base.equal_to(obj._base);
        };
        ReverseIterator.prototype.swap = function (obj) {
            this._base.swap(obj._base);
        };
        return ReverseIterator;
    }(std.Iterator));
    std.ReverseIterator = ReverseIterator;
})(std || (std = {}));
var std;
(function (std) {
    /* =========================================================
     GLOBAL FUNCTIONS
     - MOVERS
     - BEGIN
     - END
     ============================================================
     MOVERS
     --------------------------------------------------------- */
    /**
     * Return distance between {@link Iterator iterators}.
     *
     * Calculate the number of elements between first and last
     * 요소의 처음과 마지막 사이를 계산한다.
     *
     * If it is a {@link IArrayIterator random-access iterator}, the function uses operator- to calculate this.
     * Otherwise, the function use the increate operator {@link Iterator.next next()} repeatedly
     *
     * @param first Iterator pointing to the initial element.
     * @param last Iterator pointing toe the final element. This must be reachable form first
     *
     * @return The number of elements between first and last.
     */
    function distance(first, last) {
        if (first.index != undefined) {
            // WHEN IARRAY_ITERATOR
            // ABS FOR REVERSE_ITERATOR
            return Math.abs(last.index - first.index);
        }
        var length = 0;
        for (; !first.equal_to(last); first = first.next()) {
            length++;
        }
        return length;
    }
    std.distance = distance;
    /**
     * Advance iterator.
     *
     * Advance the iterator it by n elements positions.
     *
     * @param it Iterator to be advaced.
     * @param n Number of element positions to advance.
     *
     * @return An iterator the the element n position before
     */
    function advance(it, n) {
        return it.advance(n);
    }
    std.advance = advance;
    /**
     * Get Iterator to previous element
     *
     * Returns an iterator pointing to the element that it would be pointing to if advanced -n position.
     *
     * @param it Iterator to base position.
     * @param n Number of element position offet (1 by default)
     *
     * @return An iterator to the element n positions before it
     */
    function prev(it, n) {
        if (n === void 0) { n = 1; }
        return it.advance(n);
    }
    std.prev = prev;
    /**
     * Get Iterator to next element
     *
     * Returns an Iterator pointing to the element thant it would be pointing to if advanced n position
     *
     * @param it Iterator to base position.
     * @param n Number of element positions offset (1 by default)
     *
     * @return An Iterator to the lement n positions away from it
     */
    function next(it, n) {
        if (n === void 0) { n = 1; }
        return it.advance(n);
    }
    std.next = next;
})(std || (std = {}));
//# sourceMappingURL=Iterator.js.map