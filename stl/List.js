/// <reference path="API.ts" />
var std;
(function (std) {
    /**
     * 더블 링크드 리스트
     *
     * List are sequence containers that allow constant time insert and erase operation anywhere within the
     * sequence, and iteration in both diretions
     */
    var List = (function () {
        function List() {
            //super();
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // INIT MEMBERS
            //this._end = new ListIterator(this, null, null, null);
            //this._end.set_prev(this._end);
            //this._end.set_next(this._end);
            this._begin = this._end;
            this._size = 0;
            if (args.length == 0) {
            }
            else if (args.length == 1 && args[0] instanceof Array) {
                // initialize list Constructor
                var array = args[0];
                this.push.apply(this, array);
            }
            else if (args.length == 1 && args[0] instanceof std.base.Container) {
                // copy constructor
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                // range constructor
                var begin = args[0];
                var end = args[1];
                this.assign(begin, end);
            }
            else if (args.length == 2 && typeof args[0] == 'number') {
                // Fill constructor
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
         * @inheritDoc
         *
         */
        List.prototype.clear = function () {
            // DISCONNECT NODES
            this._begin = this._end;
            //this._end.set_prev(this._end);
            //this._end.set_next(this._end);
        };
        /* =========================================================
         ACCESSORS
         ========================================================= */
        /**
         * @inheritDoc
         *
         */
        List.prototype.begin = function () {
            return this._begin;
        };
        /**
         * @inheritDoc
         *
         */
        List.prototype.end = function () {
            return this._end;
        };
        /**
         * @inheritDoc
         *
         */
        List.prototype.rbegin = function () {
            return new std.ListReverseIterator(this.end());
        };
        /**
         * @inheritDoc
         *
         */
        List.prototype.rend = function () {
            return new std.ListReverseIterator(this.begin());
        };
        /**
         * @inheritDoc
         *
         */
        List.prototype.size = function () {
            return this._size;
        };
        /**
         * @inheritDoc
         *
         */
        List.prototype.front = function () {
            return this._begin.value;
        };
        /**
         * @inheritDoc
         *
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
         * @inheritDoc
         *
         */
        List.prototype.push = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i - 0] = arguments[_i];
            }
            var prev = std.ListIterator < T > ;
            this.end().prev();
            var first = std.ListIterator < T > ;
            null;
            for (var i = 0; i < items.length; ++i) {
            }
        };
        return List;
    }());
    std.List = List;
})(std || (std = {}));
var std;
(function (std) {
    var ListIterator = (function () {
        function ListIterator() {
        }
        return ListIterator;
    }());
    std.ListIterator = ListIterator;
})(std || (std = {}));
var std;
(function (std) {
    var ListReverseIterator = (function () {
        function ListReverseIterator() {
        }
        return ListReverseIterator;
    }());
    std.ListReverseIterator = ListReverseIterator;
})(std || (std = {}));
//# sourceMappingURL=List.js.map