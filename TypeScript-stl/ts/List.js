/// <reference path="API.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var std;
(function (std) {
    var List = (function (_super) {
        __extends(List, _super);
        function List() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            // INIT MEMBERS
            this._end = new std.ListIterator(this, null, null, null);
            this._end.set_prev(this._end);
            this._end.set_next(this._end);
            this._begin = this._end;
            this._size = 0;
            if (args.length == 0) {
            }
            else if (args.length == 1 && args[0] instanceof Array) {
                var array = args[0];
                this.push.apply(this, array);
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                var begin = args[0];
                var end = args[1];
                this.assign(begin, end);
            }
            else if (args.length == 2 && typeof args[0] == 'number') {
                var size = args[0];
                var val = args[1];
                this.assign(size, val);
            }
        }
        List.prototype.assign = function (par1, par2) {
            this.clear();
            this.insert(this.end(), par1, par2);
        };
        /**
         * @inheritdoc
         */
        List.prototype.clear = function () {
            //DISCONECT NODES
            this._begin = this._end;
            this._end.set_prev(this._end);
            this._end.set_next(this._end);
            this._size = 0;
        };
        /* =========================================================
         ACCESSORS
         ========================================================= */
        /**
         * @inheritdoc
         */
        List.prototype.begin = function () {
            return this._begin;
        };
        /**
         * @inheritdoc
         */
        List.prototype.end = function () {
            return this._end;
        };
        /**
         * @inheritdoc
         */
        List.prototype.rbegin = function () {
            return new std.ListReverseIterator(this.end());
        };
        /**
         * @inheritdoc
         */
        List.prototype.rend = function () {
            return new std.ListReverseIterator(this.begin());
        };
        /**
         * @inheritdoc
         */
        List.prototype.size = function () {
            return this._size;
        };
        /**
         * @inheritdoc
         */
        List.prototype.front = function () {
            return this._begin.value;
        };
        /**
         * @inheritdoc
         */
        List.prototype.back = function () {
            return this._end.prev().value;
        };
        /* =========================================================
         ELEMENTS I/O
         - PUSH & POP
         - INSERT
         - ERASE
         - POST-PROCESS
         ============================================================
         PUSH & POP
         --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        List.prototype.push = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i - 0] = arguments[_i];
            }
            var prev = this.end().prev();
            var first = null;
            for (var i = 0; i < items.length; ++i) {
                var item = new std.ListIterator(this, prev, null, items[i]);
                if (i == 0) {
                    first = item;
                }
                prev.set_next(item);
                prev = item;
            }
            // IF EMPTY, VAL IS THE BEGIN
            if (this.empty() == true || first.prev().equal_to(this.end()) == true) {
                this._begin = first;
            }
            // CONNECT BETWEEN LAST INSERTED ITEM AND POSITION
            prev.set_next(this._end);
            this._end.set_prev(prev);
            this._size += items.length;
            return this.size();
        };
        /**
         * @inheritdoc
         */
        List.prototype.push_font = function (val) {
            this.insert(this.begin(), val);
        };
        /**
         * @inheritdoc
         */
        List.prototype.push_back = function (val) {
            this.insert(this.end(), val);
        };
        /**
         * @inheritdoc
         */
        List.prototype.pop_front = function () {
            this.erase(this._begin);
        };
        /**
         * @inheritdoc
         */
        List.prototype.pop_back = function () {
            this.erase(this._end.prev());
        };
        return List;
    }(std.base.Container));
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
            set: function (val) {
                this._value = val;
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
            var supp_prev = this._prev;
            var supp_next = this._next;
            this._prev = obj._prev;
            this._next = obj._next;
            obj._prev = supp_prev;
            obj._next = supp_next;
            if (this._source.end() == this) {
                this._source._end = obj;
            }
            else if (this._source.end() == obj) {
                this._source._end = this;
            }
            if (this._source.begin() == this) {
                this._source._begin = obj;
            }
            else if (this._source.begin() == obj) {
                this._source._begin = this;
            }
        };
        return ListIterator;
    }(std.Iterator));
    std.ListIterator = ListIterator;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * a reverse-iterator of List
     */
    var ListReverseIterator = (function (_super) {
        __extends(ListReverseIterator, _super);
        function ListReverseIterator(base) {
            _super.call(this, base);
        }
        ListReverseIterator.prototype.create_neighbor = function () {
            return new ListReverseIterator(null);
        };
        Object.defineProperty(ListReverseIterator.prototype, "value", {
            set: function (val) {
                this._base.value = val;
            },
            enumerable: true,
            configurable: true
        });
        return ListReverseIterator;
    }(std.ReverseIterator));
    std.ListReverseIterator = ListReverseIterator;
})(std || (std = {}));
//# sourceMappingURL=List.js.map