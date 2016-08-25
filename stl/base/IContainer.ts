
/// <reference path="../API.ts" />

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