var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var std;
(function (std) {
    var base;
    (function (base) {
        /**
         * An abstract container
         */
        var Container = (function () {
            function Container() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                // THIS IS ABSTRACT CLASS
                // NOTHING TO DO ESPECIALLY
            }
            /**
             * @inheritdoc
             */
            Container.prototype.clear = function () {
                this.erase(this.begin(), this.end());
            };
            /**
             * @inheritdoc
             */
            Container.prototype.empty = function () {
                return this.size() == 0;
            };
            return Container;
        }());
        base.Container = Container;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
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
var std;
(function (std) {
    /**
     * 더블 링크드 리스트
     *
     * List are sequence containers that allow constant time insert and erase operation anywhere within the
     * sequence, and iteration in both diretions
     */
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
                // initialize list Constructor
                // 새로운 데이터를 삽입하는 생성자
                // 주어진 배열의 데이터를 같은 순서대로 저장..
                var array = args[0];
                this.push.apply(this, array);
            }
            else if (args.length == 1 && args[0] instanceof std.base.Container) {
                // copy constructor
                // 컨테이너 복사 생성자
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                // range constructor
                // 반복자의 지정한 영역으로 데이터를 채우는 생성자
                var begin = args[0];
                var end = args[1];
                this.assign(begin, end);
            }
            else if (args.length == 2 && typeof args[0] == 'number') {
                // Fill constructor
                // 지정된 개수만큼 특정 데이터로 채우는 생성자
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
         * 저장하고 있는 모든 데이터를 삭제한다.
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
         * 첫 번째 요소를 가리키는 반복자를 리턴한다.
         */
        List.prototype.begin = function () {
            return this._begin;
        };
        /**
         * @inheritDoc
         * 마지막 요소를 가리키는 반복자를 리턴한다.
         */
        List.prototype.end = function () {
            return this._end;
        };
        /**
         * @inheritDoc
         * begin()과 비슷한데 다른 점은 역 방향으로 첫 번째 요소를 리턴한다. 그리고 사용하는 반복자도 다르다.
         */
        List.prototype.rbegin = function () {
            return new std.ListReverseIterator(this.end());
        };
        /**
         * @inheritDoc
         * end()와 비슷한데 다른 점은 역 방향으로 마지막 요소 다음을 가리킨다. 그리고 사용하는 반복자도 다르다.
         * (주의: begin()과 달리 end()는 마지막 요소 바로 이전을 가리킨다. -> 사용할 수 없는 영역을 가리키므로 end()위치의 반복자는 사용하지 못한다.)
         */
        List.prototype.rend = function () {
            return new std.ListReverseIterator(this.begin());
        };
        /**
         * @inheritDoc
         * 저장하고 있는 데이터의 개수를 리턴한다.
         */
        List.prototype.size = function () {
            return this._size;
        };
        /**
         * @inheritDoc
         * 첫 번째 데이터의 값을 리턴한다.
         */
        List.prototype.front = function () {
            return this._begin.value;
        };
        /**
         * @inheritDoc
         * 마지막 데이터의 값을 리턴한다.
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
         * 새로운 데이터들을 삽입한다.
         */
        List.prototype.push = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i - 0] = arguments[_i];
            }
            var prev = this.end().prev();
            var first = null;
            for (var i = 0; i < items.length; ++i) {
                // 계속해서 연결해준다.
                var item = new std.ListIterator(this, prev, null, items[i]);
                if (i == 0) {
                    first = item;
                }
                prev.set_next(item);
                prev = item;
            }
            // 만약 EMPTY 라면,
            if (this.empty() == true || first.prev().equal_to(this.end()) == true) {
                this._begin = first;
            }
            // _end와 마지막에 삽입된 요소를 연결한다.
            prev.set_next(this._end);
            this._end.set_prev(prev);
            this._size += items.length;
            return this.size();
        };
        /**
         * @inheritdoc
         * 첫 번째 위치에 데이터를 추가한다.
         */
        List.prototype.push_front = function (val) {
            this.insert(this.begin(), val);
        };
        /**
         * @inheritdoc
         * 마지막 위치에 데이터를 추가한다.
         */
        List.prototype.push_back = function (val) {
            this.insert(this.end(), val);
        };
        /**
         * @inheritdoc
         * 첫 번째 위치의 데이터를 삭제한다.
         */
        List.prototype.pop_front = function () {
            this.erase(this._begin);
        };
        /**
         * @inheritdoc
         * 마지막 위치의 데이터를 삭제한다.
         */
        List.prototype.pop_back = function () {
            this.erase(this._end.prev());
        };
        List.prototype.insert = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var ret;
            var is_reverse_iterator = false;
            // REVERSE_ITERATOR TO ITERATOR
            if (args[0] instanceof std.ListReverseIterator) {
                is_reverse_iterator = true;
                args[0] = args[0].base().prev();
            }
            if (args.length == 2) {
                //  지정된 위치에 데이터를 삽입한다.
                ret = this.insert_by_val(args[0], args[1]);
            }
            else if (args.length == 3 && typeof args[1] == 'number') {
                // 지정된 위치에 지정된 개수만큼 데이터를 삽입한다.
                ret = this.insert_by_repeating_val(args[0], args[1], args[2]);
            }
            else {
                // 지정된 위치에 지정된 범위의 데이터를 삽입한다.
                ret = this.insert_by_range(args[0], args[1], args[2]);
            }
            // RETURN
            if (is_reverse_iterator == true) {
                return new std.ListReverseIterator(ret.next());
            }
            else {
                return ret;
            }
        };
        List.prototype.insert_by_val = function (position, val) {
            //  지정된 위치에 데이터를 삽입한다.
            return this.insert_by_repeating_val(position, 1, val);
        };
        List.prototype.insert_by_repeating_val = function (position, size, val) {
            // 지정된 위치에 지정된 개수만큼 데이터를 삽입한다.
            // IINVALID
            if (this != position.get_source()) {
                throw new Error("Parametric iterator is not this container's own.");
            }
            var prev = position.prev();
            var first = null;
            for (var i = 0; i < size; ++i) {
                var item = new std.ListIterator(this, prev, null, val);
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
            prev.set_next(position);
            position.set_prev(prev);
            return first;
        };
        List.prototype.insert_by_range = function (position, begin, end) {
            // IINVALID
            if (this != position.get_source()) {
                throw new Error("Parametric iterator is not this container's own.");
            }
            var prev = position.prev();
            var first = null;
            var size = 0;
            for (var it = begin; it.equal_to(end) == false; it = it.next()) {
                var item = new std.ListIterator(this, prev, null, it.value);
                if (size == 0) {
                    first = item;
                }
                if (prev != null) {
                    prev.set_next(item);
                }
                prev = item;
                size++;
            }
            // IF EMPTY
            if (this.empty() == true) {
                this._begin = first;
            }
            // CONNECT BETWEEN LAST AND POSITION
            prev.set_next(position);
            position.set_prev(prev);
            this._size += size;
            return first;
        };
        List.prototype.erase = function (first, last) {
            if (last === void 0) { last = first.next(); }
            var ret;
            var is_reverse_iterator = false;
            // REVERSE_ITERATOR TO ITERATOR
            if (first instanceof std.ListReverseIterator) {
                is_reverse_iterator = true;
                var first_it = last.base();
                var last_it = last.base();
                first = first_it;
                last = last_it;
            }
            // ERASE ELEMENTS
            ret = this.erase_by_range(first, last);
            if (is_reverse_iterator == true) {
                return new std.ListReverseIterator(ret.next());
            }
            else {
                return ret;
            }
        };
        List.prototype.erase_by_range = function (first, last) {
            // FIND PREV AND NEXT
            var prev = first.prev();
            // CALCULATE THE SIZE
            var size = std.distance(first, last);
            prev.set_next(last);
            last.set_prev(prev);
            this._size -= size;
            if (first == this._begin) {
                this._begin = last;
            }
            return last;
        };
        /* ===============================================================
         ALGORITHMS
         - UNIQUE & REMOVE (IF)
         - MERGE & SPLICE
         - SORT
         - SWAP
         ==================================================================
         UNIQUE & REMOVE (IF)
         --------------------------------------------------------------- */
        /**
         * @inheritDoc
         * 데이터를 교환한다.
         */
        List.prototype.swap = function (obj) {
            if (obj instanceof List) {
                this.swap_list(obj);
            }
            else {
            }
        };
        List.prototype.swap_list = function (obj) {
            _a = [obj._begin, this._begin], this._begin = _a[0], obj._begin = _a[1];
            _b = [obj._end, this._end], this._end = _b[0], obj._end = _b[1];
            _c = [obj._size, this._size], this._size = _c[0], obj._size = _c[1];
            var _a, _b, _c;
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
        function ListIterator(source, prev, next, value) {
            _super.call(this, source);
            this._prev = prev;
            this._next = next;
            this._value = value;
        }
        /**
         * 반복자의 이전 원소를 설정한다.
         */
        ListIterator.prototype.set_prev = function (it) {
            this._prev = it;
        };
        /**
         * 반복자의 다음 원소를 설정한다.
         */
        ListIterator.prototype.set_next = function (it) {
            this._next = it;
        };
        /* ---------------------------------------------------------------
         ACCESSORS
         --------------------------------------------------------------- */
        /**
         * 자신의 컨테이너(리스트) 참조를 리턴한다.
         */
        ListIterator.prototype.list = function () {
            return this._source;
        };
        /**
         * @inheritDoc
         *
         * C++ STL 에서의 -- 연산자
         * 반복자의 이전 원소를 가리키도록 이동한다.
         */
        ListIterator.prototype.prev = function () {
            return this._prev;
        };
        /**
         * @inheritDoc
         *
         * C++ STL 에서의 ++ 연산자
         * 반복자의 다음 원소를 가리키도록 이동한다.
         */
        ListIterator.prototype.next = function () {
            return this._next;
        };
        ;
        /**
         * @inheritDoc
         * 반복자를 순회한다.
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
                step *= -1;
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
            /**
             * @inheritdoc
             * 반복자의 값(데이터)를 리턴한다.
             * getter
             */
            get: function () {
                return this._value;
            },
            /**
             * @inheritdoc
             * 반복자의 값(데이터)를 리턴한다.
             * setter
             */
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
         * @inheritdoc
         * C++ STL에서의 == 연산자
         */
        ListIterator.prototype.equal_to = function (obj) {
            return this == obj;
        };
        /**
         * @inheritdoc
         * 반복자를 교환한다.
         */
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
    var ListReverseIterator = (function (_super) {
        __extends(ListReverseIterator, _super);
        /* ---------------------------------------------------------------
         CONSTRUCTORS
         --------------------------------------------------------------- */
        function ListReverseIterator(base) {
            _super.call(this, base);
        }
        /**
         * @inheritDoc
         *
         */
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
var std;
(function (std) {
    var example;
    (function (example) {
        function test_list() {
            var list = new std.List();
            for (var i = 0; i < 10; i++)
                list.push_back(i);
            var it = list.begin().advance(3);
            it = list.erase(it); // erase 3
            console.log(it.value); // print 4
            it = list.begin().advance(2);
            it = list.insert(it, -1); // insert -1
            console.log(it.next().value); // print 2
            it = list.begin().advance(6);
            it = list.erase(it, it.advance(3)); // erase from 6 to 9
            //console.log(it.value); // print 9
            console.log(it.equal_to(list.end()));
            console.log("-------------------------------------");
            for (var it_1 = list.begin(); !it_1.equal_to(list.end()); it_1 = it_1.next())
                console.log(it_1.value);
        }
        example.test_list = test_list;
    })(example = std.example || (std.example = {}));
})(std || (std = {}));
//# sourceMappingURL=test_list.js.map