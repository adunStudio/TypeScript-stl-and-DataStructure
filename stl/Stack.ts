/// <reference path="API.ts" />



namespace std
{
    export class Stack<T> {
        private _container: base.ILinearContainer<T>;

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
        public constructor(stack: Stack<T>);

        public constructor(stack: Stack<T> = null) {
            this._container = new List<T>();

            if (stack != null) {
                this._container.assign(stack._container.begin(), stack._container.end());
            }
        }

        /* =========================================================
         ACCESSORS
         ========================================================= */
        public size(): number {
            return this._container.size();
        }

        public empty(): boolean {
            return this._container.empty();
        }

        public top(): T {
            return this._container.back();
        }


        /* =========================================================
         ELEMENTS I/O
         ============================================================
         PUSH & POP & SWAP
         --------------------------------------------------------- */
        public push(val: T): void {
            this._container.push_back(val);
        }

        public pop(): void {
            this._container.pop_back();
        }

        public swap(obj: Stack<T>): void
        {
            this._container.swap(obj._container);
        }
    }
}
