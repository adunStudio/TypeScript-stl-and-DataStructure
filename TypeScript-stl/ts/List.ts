/// <reference path="API.ts" />

namespace std.List {
}

namespace std {
    export class List<T> extends base.Container<T> implements base.IDequeContainer<T> {

        // An iterator, node of beginning
        protected _begin: ListIterator<T>;

        // An iterator, node of end
        protected _end: ListIterator<T>;

        // Number of elements in this List
        protected _size: number;

        /* =========================================================
         CONSTRUCTORS & SEMI-CONSTRUCTORS
         - CONSTRUCTORS
         - ASSIGN & CLEAR
         ============================================================
         CONSTURCTORS
         --------------------------------------------------------- */
        public constructor();

        public constructor(items: Array<T>);

        public constructor(size: number, val: T);

        public constructor(container: base.IContainer<T>);

        public constructor(begin: Iterator<T>, end: Iterator<T>);

        public constructor(...args: any[]) {
            super();

            // INIT MEMBERS
            this._end = new ListIterator<T>(this, null, null, null);
            this._end.set_prev(this._end);
            this._end.set_next(this._end);

            this._begin = this._end;
            this._size = 0;

            if( args.length == 0 )
            {
                // DO NOTHING
            }
            else if( args.length == 1 && args[0] instanceof Array )
            {
                let array: Array<T> = args[0];

                this.push(...array);
            }
            /*else if( args.length == 1 && (args[0] instanceof Vector || args[0] instanceof base.Container) )
            {

            }*/
            else if( args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator )
            {
                let begin: Iterator<T> = args[0];
                let end: Iterator<T> = args[1];

                this.assign(begin, end);
            }
            else if( args.length == 2 && typeof args[0] == 'number' )
            {
                let size: number = args[0];
                let val: T = <T>args[1];

                this.assign(size, val);
            }
        }

        /* ---------------------------------------------------------
         ASSIGN & CLEAR
         --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public assign(n: number, val: T): void;
        public assign<U extends T, InputIterator extends Iterator<U>>
            (begin: InputIterator, end: InputIterator): void;
        public assign<U extends T, InputIterator extends Iterator<U>>
            (par1: any, par2: any): void
        {
            this.clear();
            this.insert(this.end(), par1, par2);
        }

        /**
         * @inheritdoc
         */
        public clear(): void {
            //DISCONECT NODES
            this._begin = this._end;
            this._end.set_prev(this._end);
            this._end.set_next(this._end);

            this._size = 0;
        }

        /* =========================================================
         ACCESSORS
         ========================================================= */
        /**
         * @inheritdoc
         */
        public begin(): ListIterator<T> {
            return this._begin;
        }
        /**
         * @inheritdoc
         */
        public end(): ListIterator<T> {
            return this._end;
        }
        /**
         * @inheritdoc
         */
        public rbegin(): ListReverseIterator<T> {
            return new ListReverseIterator<T>(this.end());
        }
        /**
         * @inheritdoc
         */
        public rend(): ListReverseIterator<T> {
            return new ListReverseIterator<T>(this.begin());
        }
        /**
         * @inheritdoc
         */
        public size(): number {
            return this._size;
        }
        /**
         * @inheritdoc
         */
        public front(): T {
            return this._begin.value;
        }
        /**
         * @inheritdoc
         */
        public back(): T {
            return this._end.prev().value;
        }

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
        public push<U extends T>(...items: U[]): number {
            let prev: ListIterator<T> = this.end().prev();
            let first: ListIterator<T> = null;

            for( let i: number = 0; i < items.length; ++i ) {
                let item: ListIterator<T> = new ListIterator(this, prev, null, items[i]);

                if( i == 0 ) {
                    first = item;
                }

                prev.set_next(item);
                prev = item;
            }

            // IF EMPTY, VAL IS THE BEGIN
            if( this.empty() == true || first.prev().equal_to(this.end()) == true ) {
                this._begin = first;
            }

            // CONNECT BETWEEN LAST INSERTED ITEM AND POSITION
            prev.set_next(this._end);
            this._end.set_prev(prev);

            this._size += items.length;

            return this.size();
        }

        /**
         * @inheritdoc
         */
        public push_font(val: T): void {
            this.insert(this.begin(), val);
        }

        /**
         * @inheritdoc
         */
        public push_back(val: T): void {
            this.insert(this.end(), val);
        }

        /**
         * @inheritdoc
         */
        public pop_front(): void {
            this.erase(this._begin);
        }

        /**
         * @inheritdoc
         */
        public pop_back(): void {
            this.erase(this._end.prev());
        }

        /* ---------------------------------------------------------
         INSERT
         --------------------------------------------------------- */
        /**
         * Insert an element
         *
         * The container is extend by inserting a new element before the element at the specified position.
         *
         */
        public insert(position: ListIterator<T>, val: T): ListIterator<T>;

        /**
         * Insert elements by repeated filling
         *
         */
        public insert(position: ListIterator<T>, size: number, val: T): ListIterator<T>;




    }

}


namespace std {
    export class ListIterator<T> extends Iterator<T> {
        private _prev: ListIterator<T>;
        private _next: ListIterator<T>;

        private _value: T;


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
        public constructor(source: List<T>, prev: ListIterator<T>, next: ListIterator<T>, value: T) {
            super(source);

            this._prev = prev;
            this._next = next;

            this._value = value;
        }

        public set_prev(it: ListIterator<T>): void {
            this._prev = it;
        }

        public set_next(it: ListIterator<T>): void {
            this._next = it;
        }

        /* ---------------------------------------------------------------
         ACCESSORS
         --------------------------------------------------------------- */
        private list(): List<T> {
            return this._source as List<T>
        }

        /**
         * @inheritdoc
         */
        public prev(): ListIterator<T> {
            return this._prev;
        }

        /**
         * @inheritdoc
         */
        public next(): ListIterator<T> {
            return this._next;
        }


        /**
         * @inheritdoc
         */
        public advance(step: number): ListIterator<T> {
            let it: ListIterator<T> = this;

            if( step >= 0 )
            {
                for( let i: number = 0; i < step; ++i )
                {
                    it = it.next();
                    if( it.equal_to(this._source.end() as ListIterator<T>) )
                    {
                        return it;
                    }
                }
            }
            else
            {
                for( let i: number = 0; i < step; ++i )
                {
                    it = it.prev();
                    if( it.equal_to(this._source.end() as ListIterator<T>) )
                    {
                        return it;
                    }
                }
            }

            return it;
        }

        public get value(): T {
            return this._value;
        }

        public set value(val: T) {
            this._value = val;
        }

        /* ---------------------------------------------------------------
         COMPARISON
         --------------------------------------------------------------- */
        /**
         *  @inheritDoc
         */
        public equal_to(obj: ListIterator<T>): boolean {
            return this == obj;
        }

        public swap(obj: ListIterator<T>): void {
            let supp_prev: ListIterator<T> = this._prev;
            let supp_next: ListIterator<T> = this._next;

            this._prev = obj._prev;
            this._next = obj._next;
            obj._prev = supp_prev;
            obj._next = supp_next;

            if( this._source.end() == this )
            {
                (<any>this._source)._end = obj;
            }
            else if( this._source.end() == obj )
            {
                (<any>this._source)._end = this;
            }

            if( this._source.begin() == this )
            {
                (<any>this._source)._begin = obj;
            }
            else if( this._source.begin() == obj )
            {
                (<any>this._source)._begin = this;
            }

        }

    }
}

namespace std {
    /**
     * a reverse-iterator of List
     */
    export class ListReverseIterator<T> extends ReverseIterator<T, ListIterator<T>, ListReverseIterator<T>> {
        public constructor(base: ListIterator<T>) {
            super(base);
        }

        protected create_neighbor(): ListReverseIterator<T> {
            return new ListReverseIterator<T>(null);
        }

        public set value(val: T) {
            this._base.value = val;
        }

    }
}