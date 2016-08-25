/**
 * Created by hong on 2016-08-25.
 */
namespace std.base {
    import ReverseIterator = std.ReverseIterator;
    /**
     * An interface of containers.
     *
     * IContainer is an interface designed for sequence containers.
     * Sequence of STL are based on the IContainer
     */
    export interface IContainer<T>
    {
        /* ---------------------------------------------------------------
         SEMI-CONSTRUCTORS
         --------------------------------------------------------------- */
        /**
         * Assigns new contents to the container, replacing its current contents, and modifying it size accordingly.
         *
         * 반복자의 지정한 역역으로 데이터를 채운다.
         *
         * @param begin Input iterator of  the initial position in a sequence
         * @param end   Input iterator of the final position in a sequence
         */
        assign<U extends T, InputIterator extends T>
            (begin: InputIterator, end: InputIterator): void;

        /**
         * Removes all elements from the Container, leaving the container with a size of 0
         *
         * 저장하고 있는 모든 데이터 삭제한다.
         */
        clear(): void;


        /* ---------------------------------------------------------------
         GETTERS
         --------------------------------------------------------------- */
        /**
         * Return iterator to beginning
         *
         * 첫 번째 요소를 가리키는 반복자를 리턴한다.
         */
        begin(): Iterator<T>;

        /**
         * Return iterator to end
         *
         * 마지막 요소를 가리킨다.
         * 주의할 점은 begin()과 달리 end()는 마지막 요소 바로 다음을 가리킨다.
         * 즉 사용할 수 없는 영역을 가리키므로 end() 위치의 반복자는 사용하지 못한다.
         */
        end(): Iterator<T>;

        /**
         * Return ReverseIterator to reverse beginning
         *
         * begin()와 비슷한데 다른 점은 역 방향으로 첫 번째 요소를 가리킨다.
         * 그리고 사용하는 반복자도 다르다.
         */
        rbegin(): base.IReverseIterator<T>;

        /**
         * Return ReverseIterator to reverse end
         *
         * end()와 비슷한데 다른 점은 역 방향으로 마지막 요소 다음을 가리킨다.
         */
        rend(): base.IReverseIterator<T>;

        /**
         * Return the number of elements in the Container
         *
         * 저장하고 있는 데이터의 개수를 리턴한다.
         */
        size(): number;

        /**
         * Test whether the container is empty
         *
         * 저장 데이터 유/무, 없으면 true를 리턴한다.
         */
        empty(): boolean;


        /* ---------------------------------------------------------------
         ELEMENTS I/O
         --------------------------------------------------------------- */
        /**
         * Insert elements
         * Appends new elements to the container, and returns the new size of the
         *
         * 새로운 데이터들을 삽입한다.
         * @param items
         *
         * @return New size of the Container
         */
        push<U extends T>(...items: U[]): number;

        /**
         * Insert an element
         * The container is extended by inserting a new element before the element at the specified position
         *
         * 지정한 위치에 데이터를 삽입한다.
         *
         * @param position  Position in the IContainer where the new element is inserted.
         * @param val       Value to be copied to the inserted elements
         *
         * @return An iterator that points th newly inserted element
         */
        insert(position: Iterator<T>, val: T): Iterator<T>;

        /**
         * Erase element
         * Removes from the container a single element
         *
         * 지정된 위치에 있는 데이터를 삭제한다.
         *
         * @param position
         *
         * @return
         */
        erase(position: Iterator<T>): Iterator<T>;

        /**
         * Erase elements
         * Removes from the container a range of elements.
         *
         * 지정한 범위에 있는 데이터들을 삭제한다.
         *
         * @param begin An iterator specifying a range of beginning to erase
         * @param end An iterator specifying a range of end to erase.
         *
         * @return
         */
        erase(begin: Iterator<T>, end: Iterator<T>): Iterator<T>;


        /* ---------------------------------------------------------------
         UTILITIES
         --------------------------------------------------------------- */
        /**
         * Swap content.
         *
         * 데이터를 교환한다.
         *
         * @param obj
         */
        swap(obj: IContainer<T>): void;
    }

    export interface IReverseIterator<T> extends ReverseIterator<T, Iterator<T>, IReverseIterator<T>>
    {

    }
}

namespace std.base
{
    /**
     * An abstract container
     */

    export abstract class Container<T> implements IContainer<T>
    {
        /* =========================================================
         CONSTRUCTORS & SEMI-CONSTRUCTORS
         - CONSTRUCTORS
         - ASSIGN & CLEAR
         ============================================================
         CONSTURCTORS
         --------------------------------------------------------- */
        /**
         * Default Constructor
         */
        public constructor();

        /**
         * Initialize list Constructor
         * Constructs a container with a copy of each of the elements in array, in the same order
         *
         * @para array An array containing elements to be copied and contained
         */
        public constructor(array: Array<T>);

        /**
         * Copy constructor
         * Constructs a container with a copy of each of the elements in container, in the saome order
         *
         * @param container Another container object of same type
         */
        public constructor(container: IContainer<T>);

        /**
         * Range constructor
         * Constructs a container with as many elements as the range begin ~ end
         *
         * @param begin Input iterator of the initial position in a sequence
         * @param end   Input iterator of the final position in a sequence
         */
        public constructor(begin: Iterator<T>, end: Iterator<T>);

        public constructor(...args: any[])
        {
            // THIS IS ABSTRACT CLASS
            // NOTHING TO DO ESPECIALLY
        }


        /* ---------------------------------------------------------
         ASSIGN & CLEAR
         --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public abstract assign<U extends T, InputIterator extends Iterator<U>>
        (begin: InputIterator, end: InputIterator): void;

        /**
         * @inheritdoc
         */
        public clear(): void
        {
            this.erase(this.begin(), this.end());
        }


        /* ---------------------------------------------------------------
         GETTERS
         --------------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public abstract begin(): Iterator<T>;

        /**
         * @inheritdoc
         */
        public abstract end(): Iterator<T>;

        /**
         * @inheritdoc
         */
        public abstract rbegin(): base.IReverseIterator<T>;

        /**
         * @inheritdoc
         */
        public abstract rend(): base.IReverseIterator<T>;

        /**
         * @inheritdoc
         */
        public abstract size(): number;

        /**
         * @inheritdoc
         */
        public empty(): boolean
        {
            return this.size() == 0;
        }


        /* =========================================================
         ELEMENTS I/O
         - INSERT
         - ERASE
         ============================================================
         INSERT
         --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public abstract push<U extends T>(...items: U[]): number;

        /**
         * @inheritdoc
         */
        public abstract insert(position: Iterator<T>, val: T): Iterator<T>;


        /* ---------------------------------------------------------
         ERASE
         --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public abstract erase(position: Iterator<T>): Iterator<T>;

        /**
         * @inheritdoc
         */
        public abstract erase<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;


        /* ---------------------------------------------------------------
         UTILITIES
         --------------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public abstract swap(obj: IContainer<T>): void;
    }
}

namespace std
{
    export abstract class Iterator<T>
    {
        /**
         * Bi-directional iterator
         * 양방향 반복자
         *
         * 반복자의 범주
         * 입력 반복자(Input-iterator): 현 위치의 원소를 한 번만 읽을 수 있는 반복자
         * 출력 반복자(Output-iterator): 현 위치의 원소를 한 번만 쓸수 있는 반복자
         * 순방향 반복자(Forward iterator): 입력, 출력 반복자 기능에 순방향으로 이동(++)이 가능한 재 할당될 수 있는 반복자
         * 양방향 반복자(Bi-directional iterator): 순방향 반복자 기능에 역방향으로 이동(--)이 가능한 반복자 (List, Set, Multiset, Map, multimap.....)
         * 임의 접근 박복자(Random access iterator): 양방향 반복자 기능에 +, -, +=, -=, [] 연산이 가능한 반복자(vector, deque)
         *
         * 모든 컨테이너는 양방향 반복자 이상을 제공한다.
         * 배열 기반 컨테이너인 vector와 deque는 임의 접근 반복자를 제공한다.
         *
         */

        /**
         * Source container
         */
        protected _source: base.IContainer<T>;


        /* ---------------------------------------------------------
         CONSTRUCTORS
         --------------------------------------------------------- */

        /**
         * Construct from the source(IContainer container)
         */
        public constructor(source: base.IContainer<T>)
        {
            this._source = source;
        }


        /* ---------------------------------------------------------
         MOVERS
         --------------------------------------------------------- */

        /**
         * Get iterator to previous element
         *
         * C++ 에서의 -- 연산자
         * 반복자의 이전 원소를 가리키도록 이동한다.
         */
        public abstract prev(): Iterator<T>;

        /**
         * Get iterator to next element
         *
         * C++ 에서의 ++ 연산자
         * 반복자의 다음 원소를 가리키도록 이동한다.
         */
        public abstract next(): Iterator<T>;

        /**
         * 반복자를 순회한다.
         *
         */
        public advance(n: number): Iterator<T>
        {
            let it: Iterator<T> = this;
            let i: number;

            if( n > 0 )
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

            return it;
        }


        /* ---------------------------------------------------------
         ACCESSORS
         --------------------------------------------------------- */

        /**
         * Get source
         */
        public get_source(): base.IContainer<T>
        {
            return this._source;
        }

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
        public equal_to<U extends T>(obj: Iterator<U>): boolean
        {
            return this._source == obj._source;
        }

        public get value(): T
        {
            throw new Error('Have to be overriden.');
        }

        /**
         * 반복자를 교환한다.
         */
        public abstract swap(obj: Iterator<T>): void;
    }
}



namespace std
{
    /**
     * This class reverses the direction in which a bidirectional or random-access iterator iterates through a range
     */
    export abstract class ReverseIterator<T, Base extends Iterator<T>, This extends ReverseIterator<T, Base, This>> extends Iterator<T>
    {
        protected _base: Base;

        /* ---------------------------------------------------------
         CONSTRUCTORS
         --------------------------------------------------------- */
        /**
         * Construct from base iterator
         *
         * @param base A reference of the base iterator, which iterates in the opposite direction
         */
        public constructor(base: Base)
        {
            if( base == null )
            {
                super(null);
            }
            else
            {
                super(base.get_source());
                this._base = base.prev() as Base;
            }
        }

        /**
         * Return base iterator
         *
         * @returns base A reference of the base iterator, which iterates in the opposite direction
         */
        public base(): Base
        {
            return this._base.next() as Base;
        }

        /**
         * CREATE A NEW OBJECT WiTH SAME TYPE
         */
        protected abstract create_neighbor(): This;


        /* ---------------------------------------------------------
         ACCESSORS
         --------------------------------------------------------- */

        /**
         * Get value of the iterator is pointing
         *
         * @return value
         */
        public get value(): T {
            return this._base.value;
        }

        /* ---------------------------------------------------------
         MOVERS
         --------------------------------------------------------- */

        /**
         * @inheritdoc
         */
        public prev(): This
        {
            let ret = this.create_neighbor();
            ret._source = this._source;
            ret._base = this._base.next() as Base;

            return ret;
        }

        /**
         * @inheritdoc
         */
        public next(): This
        {
            let ret = this.create_neighbor();
            ret._source = this._source;
            ret._base = this._base.next() as Base;

            return ret;
        }


        /**
         * @inheritdoc
         */
        public advance(n: number): This
        {
            let ret = this.create_neighbor();
            ret._source = this._source;
            ret._base = this._base.advance(-n) as Base;

            return ret;
        }

        /* ---------------------------------------------------------
         COMPARES
         --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public equal_to(obj: This): boolean
        {
            return this._base.equal_to(obj._base);
        }

        /**
         * @inheritdoc
         */
        public swap(obj: This): void
        {
            this._base.swap(obj._base);
        }
    }
}

namespace std
{
    /* =========================================================
     GLOBAL FUNCTIONS
     - MOVERS
     - BEGIN
     - END
     ============================================================
     MOVERS
     --------------------------------------------------------- */

    export function distance<T, InputIterator extends Iterator<T>>
    (first: InputIterator, last: InputIterator): number
    {
        if( (<any>first).index != undefined )
        {
            // WHEN IARRAY_ITERATOR
            // ABS FOR REVERSE_ITERATOR
            return Math.abs((<any>last).index - (<any>first).index);
        }

        let length: number = 0;

        for( ; !first.equal_to(last); first = first.next() as InputIterator )
        {
            length ++;
        }

        return length;
    }

    export function advance<T, InputIterator extends Iterator<T>>
    (it: InputIterator, n: number): InputIterator
    {
        return it.advance(n) as InputIterator;
    }


}

namespace std.base
{
    /**
     * An interface for linear containers
     */

    export interface ILinearContainer<T> extends IContainer<T>
    {
        /* ---------------------------------------------------------
         CONSTRUCTORS
         --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        assign<U extends T, InputIterator extends Iterator<U>>
            (begin: InputIterator, end: InputIterator): void;

        /**
         * Assign container content
         * Assign new contents to the IList container, replacing its current contents, and modifying its size accordingly
         *
         * 지정 개수만큼 특정 데이터로 채운다.
         *
         * @param n New size of the
         * @param val Value to fill the container with. Each of the n elements in the container will be initialize to a copy of the value
         */
        assign(n: number, val: T): void;


        /* ---------------------------------------------------------
         ACCESSORS
         --------------------------------------------------------- */
        /**
         * Access first element
         * Returns a value of the first element in the IList container
         *
         * 첫 번째 데이터의 참조를 리턴한다.
         */
        front(): T;

        /**
         * Access last element
         * Returns a value of the last element in the IList container
         *
         * 마지막 데이터의 참조를 리턴한다.
         */
        back(): T;


        /* ---------------------------------------------------------
         ELEMENTS I/O
         --------------------------------------------------------- */
        /**
         * Add element at the end
         *
         * 마지막 위치에 데이터를 추가한다.
         */
        push_back(val: T): void;

        /**
         * Delete last element
         *
         * 마지막 위치의 데이터를 삭제한다.
         */
        pop_back(): void;


        /**
         * @inheritdoc
         */
        insert(position: Iterator<T>, val: T): Iterator<T>;

        /**
         * Insert elements by range iterators
         * The IList container is extended by inserting new elements before the element at the specified position,
         * effectively increasing the IList container size by the number of repeating elements
         *
         * 지정한 위치에 지정된 개수만큼 데이터를 삽입한다.
         *
         * @param position
         * @param n
         * @param val
         */
        insert(position: Iterator<T>, n: number, val: T): Iterator<T>;

        /**
         * Insert elements by range iterators
         *
         * 지정된 위치에 지정된 범위의 데이터를 삽입한다.
         *
         * @param position
         * @param begin
         * @param end
         */
        insert<U extends T, InputIterator extends Iterator<U>>
            (position: Iterator<T>, begin: InputIterator, end: InputIterator): Iterator<T>

    }
}

namespace std.base
{
    /**
     * An interface for deque
     */

    export interface IDequeContainer<T> extends ILinearContainer<T>
    {
        /**
         * Insert element at beginning
         *
         * 첫 번째 위치에 데이터를 추가한다.
         *
         * @param val
         */
        push_front(val: T): void;

        /**
         * Delete first element
         *
         * 첫 번째 위치의 데이터를 삭제한다.
         */
        pop_front(): void;
    }
}

namespace std.List
{
    export type iterator<T> = std.ListIterator<T>;
    export type reverse_iterator<T> = std.ListReverseIterator<T>;
}

namespace std
{
    /**
     * 더블 링크드 리스트
     *
     * List are sequence containers that allow constant time insert and erase operation anywhere within the
     * sequence, and iteration in both diretions
     */
    export class List<T>
    extends base.Container<T>
    implements base.IDequeContainer<T>
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
         * 새로운 데이터를 사입하는 생성자
         * 주어진 배열의 데이터를 같은 순서대로 저장..
         * @param items
         */
        public constructor(items: Array<T>);

        /**
         * Fill Constructor
         * 지정된 개수만큼 특정 데이터로 채우는 생성자
         */
        public constructor(size: number, val: T);

        /**
         * copy constructor
         * 컨테이너 복사 생성자
         */
        public constructor(container: base.IContainer<T>);

        /**
         * range constructor
         * 반복자의 지정한 영역으로 데이터를 채우는 생성자
         */
        public constructor(begin: Iterator<T>, end: Iterator<T>);

        public constructor(...args: any[]) {
            super();

            // INIT MEMBERS

            this._end = new ListIterator(this, null, null, null);
            this._end.set_prev(this._end);
            this._end.set_next(this._end);

            this._begin = this._end;
            this._size = 0;

            if (args.length == 0) {
                // DO NOTHING
            }
            else if (args.length == 1 && args[0] instanceof Array)
            {
                // initialize list Constructor
                // 새로운 데이터를 삽입하는 생성자
                // 주어진 배열의 데이터를 같은 순서대로 저장..
                let array: Array<T> = args[0];

                this.push(...array);
            }
            else if( args.length == 1 && args[0] instanceof base.Container )
            {
                // copy constructor
                // 컨테이너 복사 생성자
                let container: base.IContainer<T> = args[0];

                this.assign(container.begin(), container.end());
            }
            else if( args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator )
            {
                // range constructor
                // 반복자의 지정한 영역으로 데이터를 채우는 생성자
                let begin: Iterator<T> = args[0];
                let end: Iterator<T> = args[1];

                this.assign(begin, end);
            }
            else if( args.length == 2 && typeof args[0] == 'number' )
            {
                // Fill constructor
                // 지정된 개수만큼 특정 데이터로 채우는 생성자
                let size: number = args[0];
                let val: T = args[1];

                this.assign(size, val);
            }
        }

        /**
         * @inheritDoc
         * 지정된 개수만큼 특정 데이터로 채운다.
         */
        public assign(n: number, val: T): void;

        /**
         * @inheritDoc
         * 반복자의 지정한 영역으로 데이터를 채운다.
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
         * 저장하고 있는 모든 데이터를 삭제한다.
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
         * 첫 번째 요소를 가리키는 반복자를 리턴한다.
         */
        public begin(): ListIterator<T>
        {
            return this._begin;
        }

        /**
         * @inheritDoc
         * 마지막 요소를 가리키는 반복자를 리턴한다.
         */
        public end(): ListIterator<T>
        {
            return this._end;
        }

        /**
         * @inheritDoc
         * begin()과 비슷한데 다른 점은 역 방향으로 첫 번째 요소를 리턴한다. 그리고 사용하는 반복자도 다르다.
         */
        public rbegin(): ListReverseIterator<T>
        {
            return new ListReverseIterator<T>(this.end());
        }

        /**
         * @inheritDoc
         * end()와 비슷한데 다른 점은 역 방향으로 마지막 요소 다음을 가리킨다. 그리고 사용하는 반복자도 다르다.
         * (주의: begin()과 달리 end()는 마지막 요소 바로 이전을 가리킨다. -> 사용할 수 없는 영역을 가리키므로 end()위치의 반복자는 사용하지 못한다.)
         */
        public rend(): ListReverseIterator<T>
        {
            return new ListReverseIterator<T>(this.begin())
        }

        /**
         * @inheritDoc
         * 저장하고 있는 데이터의 개수를 리턴한다.
         */
        public size(): number
        {
            return this._size;
        }

        /**
         * @inheritDoc
         * 첫 번째 데이터의 값을 리턴한다.
         */
        public front(): T
        {
            return this._begin.value;
        }

        /**
         * @inheritDoc
         * 마지막 데이터의 값을 리턴한다.
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
         * 새로운 데이터들을 삽입한다.
         */
        public push<U extends T>(...items: U[]): number
        {
            let prev: ListIterator<T> = this.end().prev();
            let first: ListIterator<T> = null;

            for( let i: number = 0; i < items.length; ++i )
            {
                // 계속해서 연결해준다.
                let item: ListIterator<T> = new ListIterator(this, prev, null, items[i]);
                if( i == 0 )
                {
                    first = item;
                }
                prev.set_next(item);
                prev = item;
            }

            // 만약 EMPTY 라면,
            if( this.empty() == true || first.prev().equal_to(this.end()) == true )
            {
                this._begin = first;
            }


            // _end와 마지막에 삽입된 요소를 연결한다.
            prev.set_next(this._end);
            this._end.set_prev(prev);

            this._size += items.length;

            return this.size();
        }

        /**
         * @inheritdoc
         * 첫 번째 위치에 데이터를 추가한다.
         */
        public push_front(val: T): void
        {
            this.insert(this.begin(), val);
        }

        /**
         * @inheritdoc
         * 마지막 위치에 데이터를 추가한다.
         */
        public push_back(val: T): void
        {
            this.insert(this.end(), val);
        }

        /**
         * @inheritdoc
         * 첫 번째 위치의 데이터를 삭제한다.
         */
        public pop_front(): void
        {
            this.erase(this._begin);
        }

        /**
         * @inheritdoc
         * 마지막 위치의 데이터를 삭제한다.
         */
        public pop_back(): void
        {
            this.erase(this._end.prev());
        }


        /* ---------------------------------------------------------
         INSERT
         --------------------------------------------------------- */

        /**
         * @inheritdoc
         * 지정된 위치에 데이터를 삽입한다.
         */
        public insert(position: ListIterator<T>, val: T): ListIterator<T>;
        public insert(position: ListReverseIterator<T>, val: T): ListReverseIterator<T>;

        /**
         * @inheritdoc
         * 지정된 위치에 지정된 개수만큼 데이터를 삽입한다.
         */
        public insert(position:ListIterator<T>, size: number, val: T): ListIterator<T>;
        public insert(position:ListReverseIterator<T>, size: number, val: T): ListReverseIterator<T>;

        /**
         * @inheritdoc
         * 지정된 위치에 지정된 범위의 데이터를 삽입한다.
         */
        public insert<U extends T, InputIterator extends Iterator<U>>
        (position: ListIterator<T>, begin: InputIterator, end: InputIterator): ListIterator<T>;
        public insert<U extends T, InputIterator extends Iterator<U>>
        (position: ListReverseIterator<T>, begin: InputIterator, end: InputIterator): ListIterator<T>;


        public insert(...args: any[]): ListIterator<T> | ListReverseIterator<T>
        {
            let ret: ListIterator<T>;
            let is_reverse_iterator: boolean = false;


            // REVERSE_ITERATOR TO ITERATOR
            if( args[0] instanceof ListReverseIterator )
            {
                is_reverse_iterator = true;
                args[0] = (args[0] as ListReverseIterator<T>).base().prev();
            }


            if( args.length == 2 )
            {
                //  지정된 위치에 데이터를 삽입한다.
                ret = this.insert_by_val(args[0], args[1]);
            }
            else if( args.length == 3 && typeof args[1] == 'number' )
            {
                // 지정된 위치에 지정된 개수만큼 데이터를 삽입한다.
                ret = this.insert_by_repeating_val(args[0], args[1], args[2]);
            }
            else
            {
                // 지정된 위치에 지정된 범위의 데이터를 삽입한다.
                ret = this.insert_by_range(args[0], args[1], args[2]);
            }

            // RETURN
            if( is_reverse_iterator == true )
            {
                return new ListReverseIterator<T>(ret.next());
            }
            else
            {
                return ret;
            }

        }

        private insert_by_val(position: ListIterator<T>, val: T): ListIterator<T>
        {
            //  지정된 위치에 데이터를 삽입한다.
            return this.insert_by_repeating_val(position, 1, val);
        }

        protected insert_by_repeating_val(position: ListIterator<T>, size: number, val: T): ListIterator<T>
        {
            // 지정된 위치에 지정된 개수만큼 데이터를 삽입한다.

            // IINVALID
            if( this != position.get_source() )
            {
                throw new Error("Parametric iterator is not this container's own.");
            }

            let prev: ListIterator<T> = <ListIterator<T>>position.prev();
            let first: ListIterator<T> = null;

            for( let i: number = 0; i < size; ++i )
            {
                let item: ListIterator<T> = new ListIterator(this, prev, null, val);
                if( i == 0)
                {
                    first = item;
                }
                prev.set_next(item);
                prev = item;
            }

            // IF EMPTY, VAL IS THE BEGIN
            if( this.empty() == true || first.prev().equal_to(this.end()) == true )
            {
                this._begin = first;
            }

            prev.set_next(position);
            position.set_prev(prev);

            return first;
        }

        protected insert_by_range<U extends T, InputIterator extends Iterator<U>>
        (position: ListIterator<T>, begin: InputIterator, end: InputIterator): ListIterator<T>
        {
            // IINVALID
            if( this != position.get_source() )
            {
                throw new Error("Parametric iterator is not this container's own.");
            }

            let prev: ListIterator<T> = <ListIterator<T>>position.prev();
            let first: ListIterator<T> = null;

            let size: number = 0;

            for( let it = begin; it.equal_to(end) == false; it = it.next() as InputIterator )
            {
                let item: ListIterator<T> = new ListIterator(this, prev, null, it.value);

                if( size == 0 )
                {
                    first = item;
                }

                if( prev != null )
                {
                    prev.set_next(item);
                }

                prev = item;
                size ++;
            }

            // IF EMPTY
            if( this.empty() == true )
            {
                this._begin = first;
            }

            // CONNECT BETWEEN LAST AND POSITION
            prev.set_next(position);
            position.set_prev(prev);

            this._size += size;

            return first;
        }

        /* ---------------------------------------------------------
         ERASE
         --------------------------------------------------------- */

        /**
         * @inheritdoc
         * 지정된 위치에 있는 데이터를 삭제한다.
         */
        public erase(position: ListIterator<T>): ListIterator<T>;
        public erase(position: ListReverseIterator<T>): ListReverseIterator<T>;


        /**
         * @inheritdoc
         * 지정한 범위에 있는 데이터들을 삭제한다.
         */
        public erase(begin: ListIterator<T>, end: ListIterator<T>): ListIterator<T>;
        public erase(begin: ListReverseIterator<T>, end: ListReverseIterator<T>): ListReverseIterator<T>;

        public erase(first: any, last: any = first.next()): ListIterator<T> | ListReverseIterator<T>
        {
            let ret: ListIterator<T>;
            let is_reverse_iterator: boolean = false;

            // REVERSE_ITERATOR TO ITERATOR
            if( first instanceof ListReverseIterator )
            {
                is_reverse_iterator = true;

                let first_it = (last as ListReverseIterator<T>).base();
                let last_it = (last as ListReverseIterator<T>).base();

                first = first_it;
                last = last_it;
            }

            // ERASE ELEMENTS
            ret = this.erase_by_range(first, last);

            if( is_reverse_iterator == true )
            {
                return new ListReverseIterator<T>(ret.next());
            }
            else
            {
                return ret;
            }

        }

        protected erase_by_range(first: ListIterator<T>, last: ListIterator<T>): ListIterator<T>
        {
            // FIND PREV AND NEXT
            let prev: ListIterator<T> = <ListIterator<T>>first.prev();

            // CALCULATE THE SIZE
            let size: number = distance(first, last);

            prev.set_next(last);
            last.set_prev(prev);

            this._size -= size;

            if( first == this._begin )
            {
                this._begin = last;
            }

            return last;
        }


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
        public swap(obj: base.IContainer<T>): void
        {
            if( obj instanceof List)
            {
                this.swap_list(obj);
            }
            else
            {
                // NONE Implementation
            }
        }

        private swap_list(obj: List<T>): void
        {
            [this._begin, obj._begin] = [obj._begin, this._begin];
            [this._end,   obj._end  ] = [obj._end,   this._end  ];
            [this._size,  obj._size ] = [obj._size,  this._size ];
        }

    }
}

namespace std
{
    export class ListIterator<T> extends Iterator<T>
    {
        /**
         * 반복자의 이전 원소(반복자)
         */
        private _prev: ListIterator<T>;
        /**
         * 반복자의 다음 원소(반복자)
         */
        private _next: ListIterator<T>;

        /**
         * 반복자의 값(컨테이너의 데이터)
         */
        private _value: T;

        /* ---------------------------------------------------------------
         CONSTRUCTORS
         --------------------------------------------------------------- */

        public constructor(source: List<T>, prev: ListIterator<T>, next: ListIterator<T>, value: T)
        {
            super(source);

            this._prev = prev;
            this._next = next;

            this._value = value;
        }

        /**
         * 반복자의 이전 원소를 설정한다.
         */
        public set_prev(it: ListIterator<T>): void
        {
            this._prev = it;
        }

        /**
         * 반복자의 다음 원소를 설정한다.
         */
        public set_next(it: ListIterator<T>): void
        {
            this._next = it;
        }

        /* ---------------------------------------------------------------
         ACCESSORS
         --------------------------------------------------------------- */

        /**
         * 자신의 컨테이너(리스트) 참조를 리턴한다.
         */
        private list(): List<T>
        {
            return this._source as List<T>;
        }


        /**
         * @inheritDoc
         *
         * C++ STL 에서의 -- 연산자
         * 반복자의 이전 원소를 가리키도록 이동한다.
         */
        public prev(): ListIterator<T>
        {
            return this._prev;
        }

        /**
         * @inheritDoc
         *
         * C++ STL 에서의 ++ 연산자
         * 반복자의 다음 원소를 가리키도록 이동한다.
         */
        public next(): ListIterator<T>
        {
            return this._next;
        };

        /**
         * @inheritDoc
         * 반복자를 순회한다.
         */
        public advance(step: number): ListIterator<T>
        {
            let it: ListIterator<T> = this;

            if( step >= 0 )
            {
                for( let i: number = 0; i < step; ++i )
                {
                    it = it.next();

                    if( it.equal_to(this._source.end() as ListIterator<T>) ) {
                        return it;
                    }
                }
            }
            else
            {
                step *= -1;

                for( let i: number = 0; i < step; ++i )
                {
                    it = it.prev();

                    if( it.equal_to(this._source.end() as ListIterator<T>) ) {
                        return it;
                    }
                }
            }

            return it;
        }

        /**
         * @inheritdoc
         * 반복자의 값(데이터)를 리턴한다.
         * getter
         */
        public get value(): T
        {
            return this._value;
        }

        /**
         * @inheritdoc
         * 반복자의 값(데이터)를 리턴한다.
         * setter
         */
        public set value(val: T)
        {
            this._value = val;
        }


        /* ---------------------------------------------------------------
         COMPARISON
         --------------------------------------------------------------- */
        /**
         * @inheritdoc
         * C++ STL에서의 == 연산자
         */
        public equal_to(obj: ListIterator<T>): boolean
        {
            return this == obj;
        }

        /**
         * @inheritdoc
         * 반복자를 교환한다.
         */
        public swap(obj: ListIterator<T>): void
        {
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
            else if( this._source.end() == obj)
            {
                (<any>this._source)._end = this;
            }

            if (this._source.begin() == this)
            {
                (<any>this._source)._begin = obj;
            }
            else if (this._source.begin() == obj)
            {
                (<any>this._source)._begin = this;
            }
        }


    }
}

namespace std
{
    export class ListReverseIterator<T>
    extends ReverseIterator<T, ListIterator<T>, ListReverseIterator<T>>
    {
        /* ---------------------------------------------------------------
         CONSTRUCTORS
         --------------------------------------------------------------- */
        public constructor(base: ListIterator<T>)
        {
            super(base);
        }

        /**
         * @inheritDoc
         *
         */
        protected create_neighbor(): ListReverseIterator<T>
        {
            return new ListReverseIterator<T>(null);
        }

        public set value(val: T)
        {
            this._base.value = val;
        }
    }
}

namespace std.example
{
    export function test_list(): void
    {
        let list: std.List<number> = new std.List<number>();
        for (let i: number = 0; i < 10; i++)
            list.push_back(i);

        let it = list.begin().advance(3);
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
        for (let it = list.begin(); !it.equal_to(list.end()); it = it.next())
            console.log(it.value);
    }
}


