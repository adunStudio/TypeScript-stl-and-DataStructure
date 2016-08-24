/// <reference path="API.ts" />


namespace std
{
    /**
     * 더블 링크드 리스트
     *
     * List are sequence containers that allow constant time insert and erase operation anywhere within the
     * sequence, and iteration in both diretions
     */
    export class List<T>
        //extends base.Container<T>
        //implements base.IDequeContainer<T>
    {
        // 첫 번째 요소를 가리키는 반복자
        protected _begin: ListIterator<T>;

        // 마지막 요소를 가리키는 반복자
        protected _end: ListIterator<T>;

        // 저장하고 있는 데이터의 개수
        protected _size: number;

        /* =========================================================
         CONSTRUCTORS & SEMI-CONSTRUCTORS
         - CONSTRUCTORS
         - ASSIGN & CLEAR
         ============================================================
         생성자
         --------------------------------------------------------- */

        /**
         * Default Constructor
         * 빈 컨테이너 생성자
         */
        public constructor();

        /**
         * Initialize list Constructor
         * 주어진 배열의 데이터를 같은 순서대로 저장하는 생성자.
         * @param items
         */
        public constructor(items: Array<T>);

        /**
         * Fill Constructor
         */
        public constructor(size: number, val: T);

        /**
         * copy constructor
         */
        public constructor(container: base.IContainer<T>);

        /**
         * range constructor
         */
        public constructor(begin: Iterator<T>, end: Iterator<T>);

        public constructor(...args: any[]) {
            //super();

            // INIT MEMBERS

            //this._end = new ListIterator(this, null, null, null);
            //this._end.set_prev(this._end);
            //this._end.set_next(this._end);

            this._begin = this._end;
            this._size = 0;

            if (args.length == 0) {
                // DO NOTHING
            }
            else if (args.length == 1 && args[0] instanceof Array)
            {
                // initialize list Constructor
                let array: Array<T> = args[0];

                this.push(...array);
            }
            else if( args.length == 1 && args[0] instanceof base.Container )
            {
                // copy constructor
                let container: base.IContainer<T> = args[0];

                this.assign(container.begin(), container.end());
            }
            else if( args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator )
            {
                // range constructor
                let begin: Iterator<T> = args[0];
                let end: Iterator<T> = args[1];

                this.assign(begin, end);
            }
            else if( args.length == 2 && typeof args[0] == 'number' )
            {
                // Fill constructor
                let size: number = args[0];
                let val: T = args[1];

                this.assign(size, val);
            }
        }

        /**
         * @inheritDoc
         *
         */
        public assign(n: number, val: T): void;

        /**
         * @inheritDoc
         *
         */
        public assign<U extends T, InputIterator extends Iterator<U>>
            (begin: InputIterator, end: InputIterator): void;

        public assign<U extends T, InputIterator extends Iterator<U>>
            (par1: any, par2: any): void
        {
            this.clear();
            this.insert(this.end(), par1, par2);
        }

        /**
         * @inheritDoc
         *
         */
        public clear(): void
        {
            // DISCONNECT NODES
            this._begin = this._end;
            //this._end.set_prev(this._end);
            //this._end.set_next(this._end);
        }

        /* =========================================================
         ACCESSORS
         ========================================================= */
        /**
         * @inheritDoc
         *
         */
        public begin(): ListIterator<T>
        {
            return this._begin;
        }

        /**
         * @inheritDoc
         *
         */
        public end(): ListIterator<T>
        {
            return this._end;
        }

        /**
         * @inheritDoc
         *
         */
        public rbegin(): ListReverseIterator<T>
        {
            return new ListReverseIterator<T>(this.end());
        }

        /**
         * @inheritDoc
         *
         */
        public rend(): ListReverseIterator<T>
        {
            return new ListReverseIterator<T>(this.begin())
        }

        /**
         * @inheritDoc
         *
         */
        public size(): number
        {
            return this._size;
        }

        /**
         * @inheritDoc
         *
         */
        public front(): T
        {
            return this._begin.value;
        }

        /**
         * @inheritDoc
         *
         */
        public back(): T
        {
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
         * @inheritDoc
         *
         */
        public push<U extends T>(...items: U[]): number
        {
            let prev = ListIterator<T> = this.end().prev();
            let first = ListIterator<T> = null;

            for( let i: number = 0; i < items.length; ++i )
            {

            }
        }







    }
}

namespace std
{
    export class ListIterator<T>
    {

    }
}

namespace std
{
    export class ListReverseIterator<T>
    {

    }
}