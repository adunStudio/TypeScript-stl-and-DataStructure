/// <reference path="API.ts" />
var std;
(function (std) {
    var Stack = (function () {
        function Stack(stack) {
            if (stack === void 0) { stack = null; }
            this._container = new std.List();
            if (stack != null) {
                this._container.assign(stack._container.begin(), stack._container.end());
            }
        }
        /* =========================================================
         ACCESSORS
         ========================================================= */
        Stack.prototype.size = function () {
            return this._container.size();
        };
        Stack.prototype.empty = function () {
            return this._container.empty();
        };
        Stack.prototype.top = function () {
            return this._container.back();
        };
        /* =========================================================
         ELEMENTS I/O
         ============================================================
         PUSH & POP & SWAP
         --------------------------------------------------------- */
        Stack.prototype.push = function (val) {
            this._container.push_back(val);
        };
        Stack.prototype.pop = function () {
            this._container.pop_back();
        };
        Stack.prototype.swap = function (obj) {
            this._container.swap(obj._container);
        };
        return Stack;
    }());
    std.Stack = Stack;
})(std || (std = {}));
//# sourceMappingURL=Stack.js.map