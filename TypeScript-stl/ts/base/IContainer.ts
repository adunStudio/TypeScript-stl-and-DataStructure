/// <reference path="../API.ts" />

namespace std.base {
    import ReverseIterator = std.ReverseIterator;
    /**
     * An interface of containers.
     *
     * IContainer is an interface designed for sequence containers. Sequence containers of STL
     *
     * Container properties
     *
     * - Sequence -
     * Element in sequence containers are ordered in a strict linear sequence.
     * 시퀀스 컨테이너의 요소들은 엄격한 선형 순서로 정렬된다.
     * Individual elements are accessed by their position in this sequence
     * 개별요소는 이 순서에서 자신의 위치에 의해 액세스 할 수 있다.
     *
     * - Doubly-linked list
     * Each element keeps information on how to locate the next and the previous elements,
     * 각 요소는 어떻게 다음와 이전의 요소를 찾는지에 대한 정보를 유지한다.
     * allowing constant time insert and erase operation before or after a specific element
     * but no direct random access.
     *
     * @param <T> Type of elements
     */
    export interface IContainer<T> {

        /* ---------------------------------------------------------------
         SEMI-CONSTRUCTORS
         --------------------------------------------------------------- */
        /**
         * Assign new content to content
         *
         * Assing new content to the container, replacing ist current content, and modifying its size accordingly
         * 컨테이터에 새로운 콘텐츠를 할당하며 현재 컨텐츠를 대체하고 그에 다라서 size를 수정한다.
         *
         * @param begin Input iterator of the initial position in a sequence.
         * @param end Input iterator of the final position in a sequence.
         */
        assign<U extends T, InputIterator extends Iterator<U>>
            (begin: InputIterator, end: InputIterator): void;

        /**
         * Clear contents.
         *
         * Remove all elements from the Container, leaving the container with a size of 0.
         */
        clear(): void;

        /* ---------------------------------------------------------------
         GETTERS
         --------------------------------------------------------------- */
        /**
         * Return iterator to beginning.
         *
         * Returns an iterator referring the first element in the
         *
         * Note
         * If the container is {@link empty}, the returned iterator is same with {@link end end()}.
         * // 요약 첫번째 요소의 반복자 리턴
         *
         * @return An iterator to the first element in the The iterator containes the first element'value.
         */
        begin(): Iterator<T>;

        /**
         * Return iterator to end.
         * Returns an iterator referring to the past-the-end element in the
         *
         * The past-the-end element is the the theoretical element that would follow the last element in the
         * past-the-end 요소는 마지막 요소를 따를 이론적 요소다.
         * It does not point to any element, and thus shall not be dereferenced.
         *
         * @return An Iterator to the end element in the
         */
        end(): Iterator<T>;

        /**
         * Return {@link ReverseIterator reverse iterator} to reverse beginning
         *
         * Returns a {@link ReverseIterator reverse iterator} pointing to the last element in the container (i.e., its <i>reverse beginning</i>)
         *
         * @return A {@link ReverseIterator reverse iterator} to the <i>reverse beginning</i> of the sequence
         */
        rbegin(): base.IReverseIterator<T>;

        /**
         * Return {@link ReverseIterator reverse iterator} to reverse end
         * ...
         * ...
         *
         * @return A {@link ReverseIterator reverse iterator} to the <i>reverse end</i> of the sequence
         */
        rend(): base.IReverseIterator<T>;

        /**
         * Return the number of elements in the Container.
         *
         * @return The number of elements in the
         */
        size(): number;

        /**
         * Test whether the container is empty
         *
         * This function does not modify the container in any way
         */
        empty(): boolean;

        /* ---------------------------------------------------------------
         ELEMENTS I/O
         --------------------------------------------------------------- */
        /**
         * Insert elements
         *
         * Appends new elements to the container, and returns the new size of the
         * 새로운 요소들을 컨테이너에 추가하고, 새로운 사이즈를 리턴한다.
         *
         * @param items New elements to insert
         *
         * @return New size of the Container.
         */
        push<U extends T>(...items: U[]): number

        /**
         * Insert element
         *
         * The container is extended by inserting a new element before the element at the specified position
         * 컨테이너는 지정된 위치에 있는 요소앞에 새로운 요소를 insert 함으로써 확장된다.
         *
         * @param postion Position in the {@link IContainer} where the new element is inserted.
         *                                {@link iterator} is a member type, defined as a {@link Iterator random access iterator}
         *                                type that points to elements.
         * @param val Value to be copied to the inserted element
         *
         * @return An iterator that points to the newly inserted element.
         */
        insert(position: Iterator<T>, val: T): Iterator<T>;

        /**
         * Erase an element.
         *
         * Removes from the container a single element.
         *
         * This effectively reduces the container size by the number of element removed
         *
         * @param position Iterator pointing to a single element to be removed from the Container
         *
         * @return An iterator pointing to the element that followed the last element erased by the function call
         * This is the {@link end Container.end} if the operation erased the last element in the sequence
         */
        erase(position: Iterator<T>): Iterator<T>

        /**
         * Erase elements
         *
         * Removes from the container a range of elements
         *
         * @param begin An iterator specifying a range of beginning to erase.
         * @param end An iterator specifying a range of end to erase
         *
         * @return An iterator pointing to the element that followed the last element erased by the function call
         * This is the {@link end Container.end} if the operation erased the last element in the sequence
         */
        erase(begin: Iterator<T>, end: Iterator<T>): Iterator<T>

        /* ---------------------------------------------------------------
         UTILITIES
         --------------------------------------------------------------- */

        /**
         * Swap content
         *
         * Exchanges the content of the container by the content of <i>obj</i>, which is another @link IContainer container} object with same type of elements. Sizes and container type may differ.
         *
         *
         */
        swap(obj: IContainer<T>): void;
    }

    export interface IReverseIterator<T> extends ReverseIterator<T, Iterator<T>, IReverseIterator<T>> {

    }
}

