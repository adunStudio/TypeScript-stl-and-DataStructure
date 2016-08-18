/*
/// <reference path="../API.ts" />

namespace std.base {

    /!**
     * Array
     *
     * IArray is an interface for sequence containers representing arrays that can change in size
     * However, compared to arrays IArray objects consume more memory in exchange for the ability to mange storage and grow dynamically in an efficient way
     *
     * IArray는 크기를 변경할 수 있는 배열을 나타내는 시퀀스 컨테이너에 대한 인터페이스다.
     * 그러나, 배열과 비교하면 IArray 객체는 저장소에 대해 효율적인 교환 능력과 동적으로 크기를 늘리는 대신 더 많은 메모리를 소모한다.
     *
     * Both Vector and Deque who implemented IArray provide a very similar interface and can be used for similar purpose, but internally both work in quite different ways:
     * While Vector use a single array that needs to be occasionally reallocated for growth, the elements of a Deque can be scattered in different chunks of storage, with
     * the container keeping the necessary information internally to provide direct access to any of it elements in constant time and with a uniform sequential interface
     * Therefore, Deque are a little more complex internally than Vector, but this allows them to grow more efficiently under certatin circumstances,
     * especially with very long sequences, where reallocations become more expensive
     *
     * IArray로 구현 되는 Vector와 Deque 둘 다 비슷한 인터페이스를 제공하여 비슷한 목적으로 사용되어진다. 그러나 내부적으로는 둘다 상당히 다른 방법으로 수행한다.
     * Vector는 가끔 성장을 위해 다시 할당할 필요가 있는 단일 배열을 사용하는 반면에, Deque의 요소는 다른 저장소의
     *
     * For operations that involve frequent insertion of elements at positions other than the beginning or end,
     * IArray objects perform worse and have less consistent iterators and references than List
     *
     * 처음과 끝이 아닌 요소의 위치에서 빈번한 삽입이 필요하는 작업의 경우우,
     * IArray 객체는 리스트보다 더 나쁘게 수행하고 덜 일관된 이터레이터와 레퍼런스
     *
     * *!/

    export interface IArrayContainer extends

}*/
