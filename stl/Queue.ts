/// <reference path="API.ts" />

namespace std
{
    export class Queue<T>
    {
        private _container: base.IDequeContainer<T>;


        /* =========================================================
         - CONSTRUCTORS
         ============================================================
         생성자
         --------------------------------------------------------- */
        /**
         * 빈 컨테이너 생성자
         */
        public constructor();

        /**
         * 컨테이너 복사 생성자
         */
        public constructor(container: Queue<T>);

        public constructor(queue: Queue<T> = null)
        {
            this._container = new List<T>();

            if( queue != null )
            {
                this._container.assign(queue._container.begin(), queue._container.end());
            }
        }


        /* =========================================================
         ACCESSORS
         ========================================================= */
        public size(): number
        {
            return this._container.size();
        }

        public empty(): boolean
        {
            return this._container.empty();
        }

        public front(): T
        {
            return this._container.front();
        }

        public back(): T
        {
            return this._container.back();
        }


        /* =========================================================
         ELEMENTS I/O
         ============================================================
         PUSH & POP & SWAP
         --------------------------------------------------------- */
        public push(val: T): void
        {
            this._container.push_back(val);
        }

        public pop(): void {
            this._container.pop_front();
        }

        public swap(obj: Queue<T>): void
        {
            this._container.swap(obj._container);
        }

    }
}


namespace std
{

}