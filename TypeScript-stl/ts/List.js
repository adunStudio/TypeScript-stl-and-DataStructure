/// <reference path="API.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var std;
(function (std) {
    var List = (function () {
        function List() {
        }
        return List;
    }());
    std.List = List;
})(std || (std = {}));
var std;
(function (std) {
    var ListIterator = (function (_super) {
        __extends(ListIterator, _super);
        /* ---------------------------------------------------------------
         CONSTRUCTORS
         --------------------------------------------------------------- */
        /**
         * Construct from the source List container
         *
         * Do not create the iterator directly, by yourself.
         *
         * @param source The source List container to reference
         * @param prev A reference of previous node ({@link ListIterator iterator}).
         * @param next A reference of next node
         * @param value Value to be stored in the node
         */
        function ListIterator(source, prev, next, value) {
            _super.call(this, source);
            this._prev = prev;
            this._next = next;
            this._value = value;
        }
        ListIterator.prototype.set_prev = function (it) {
            this._prev = it;
        };
        ListIterator.prototype.set_next = function (it) {
            this._next = it;
        };
        /* ---------------------------------------------------------------
         ACCESSORS
         --------------------------------------------------------------- */
        ListIterator.prototype.list = function () {
            return this._source;
        };
        /**
         * @inheritdoc
         */
        ListIterator.prototype.prev = function () {
            return this._prev;
        };
        /**
         * @inheritdoc
         */
        ListIterator.prototype.next = function () {
            return this._next;
        };
        /**
         * @inheritdoc
         */
        ListIterator.prototype.advance = function (step) {
            var it = this;
            if (step >= 0) {
                for (var i = 0; i < step; ++i) {
                    it = it.next();
                    if (it.equal_to(this._source.end())) {
                        return it;
                    }
                }
            }
            else {
                for (var i = 0; i < step; ++i) {
                    it = it.prev();
                    if (it.equal_to(this._source.end())) {
                        return it;
                    }
                }
            }
            return it;
        };
        Object.defineProperty(ListIterator.prototype, "value", {
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        /* ---------------------------------------------------------------
         COMPARISON
         --------------------------------------------------------------- */
        /**
         *  @inheritDoc
         */
        ListIterator.prototype.equal_to = function (obj) {
            return this == obj;
        };
        ListIterator.prototype.swap = function (obj) {
        };
        return ListIterator;
    }(std.Iterator));
    std.ListIterator = ListIterator;
})(std || (std = {}));
//# sourceMappingURL=List.js.map