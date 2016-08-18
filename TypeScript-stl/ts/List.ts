/// <reference path="API.ts" />

namespace std.List {
}

namespace std {
    export class List<T> {

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

        }

    }
}