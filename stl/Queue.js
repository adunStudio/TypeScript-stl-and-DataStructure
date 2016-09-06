/// <reference path="API.ts" />
var std;
(function (std) {
    var Queue = (function () {
        function Queue(queue) {
            if (queue === void 0) { queue = null; }
            this._container = new std.List();
            if (queue != null) {
                this._container.assign(queue._container.begin(), queue._container.end());
            }
        }
        /* =========================================================
         ACCESSORS
         ========================================================= */
        Queue.prototype.size = function () {
            return this._container.size();
        };
        Queue.prototype.empty = function () {
            return this._container.empty();
        };
        Queue.prototype.front = function () {
            return this._container.front();
        };
        Queue.prototype.back = function () {
            return this._container.back();
        };
        /* =========================================================
         ELEMENTS I/O
         ============================================================
         PUSH & POP & SWAP
         --------------------------------------------------------- */
        Queue.prototype.push = function (val) {
            this._container.push_back(val);
        };
        Queue.prototype.pop = function () {
            this._container.pop_front();
        };
        Queue.prototype.swap = function (obj) {
            this._container.swap(obj._container);
        };
        return Queue;
    }());
    std.Queue = Queue;
})(std || (std = {}));
//# sourceMappingURL=Queue.js.map