/// <reference path="API.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var std;
(function (std) {
    var Iterator = (function () {
        /* ---------------------------------------------------------
         CONSTRUCTORS
         --------------------------------------------------------- */
        /**
         * Construct from the source(IContainer container)
         */
        function Iterator(source) {
            this._source = source;
        }
        /**
         * 반복자를 순회한다.
         *
         */
        Iterator.prototype.advance = function (n) {
            var it = this;
            var i;
            if (n > 0) {
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
         */
        Iterator.prototype.get_source = function () {
            return this._source;
        };
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
        Iterator.prototype.equal_to = function (obj) {
            return this._source == obj._source;
        };
        Object.defineProperty(Iterator.prototype, "value", {
            get: function () {
                throw new Error('Have to be overriden.');
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
     * This class reverses the direction in which a bidirectional or random-access iterator iterates through a range
     */
    var ReverseIterator = (function (_super) {
        __extends(ReverseIterator, _super);
        /* ---------------------------------------------------------
         CONSTRUCTORS
         --------------------------------------------------------- */
        /**
         * Construct from base iterator
         *
         * @param base A reference of the base iterator, which iterates in the opposite direction
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
         * Return base iterator
         *
         * @returns base A reference of the base iterator, which iterates in the opposite direction
         */
        ReverseIterator.prototype.base = function () {
            return this._base.next();
        };
        Object.defineProperty(ReverseIterator.prototype, "value", {
            /* ---------------------------------------------------------
             ACCESSORS
             --------------------------------------------------------- */
            /**
             * Get value of the iterator is pointing
             *
             * @return value
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
            ret._source = this._source;
            ret._base = this._base.next();
            return ret;
        };
        /**
         * @inheritdoc
         */
        ReverseIterator.prototype.next = function () {
            var ret = this.create_neighbor();
            ret._source = this._source;
            ret._base = this._base.next();
            return ret;
        };
        /**
         * @inheritdoc
         */
        ReverseIterator.prototype.advance = function (n) {
            var ret = this.create_neighbor();
            ret._source = this._source;
            ret._base = this._base.advance(-n);
            return ret;
        };
        /* ---------------------------------------------------------
         COMPARES
         --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        ReverseIterator.prototype.equal_to = function (obj) {
            return this._base.equal_to(obj._base);
        };
        /**
         * @inheritdoc
         */
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
    function advance(it, n) {
        return it.advance(n);
    }
    std.advance = advance;
})(std || (std = {}));
//# sourceMappingURL=Iterator.js.map