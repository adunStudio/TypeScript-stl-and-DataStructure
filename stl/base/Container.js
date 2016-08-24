/// <reference path="../API.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        /**
         * An abstract container
         */
        var Container = (function () {
            function Container() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                // THIS IS ABSTRACT CLASS
                // NOTHING TO DO ESPECIALLY
            }
            /**
             * @inheritdoc
             */
            Container.prototype.clear = function () {
                this.erase(this.begin(), this.end());
            };
            /**
             * @inheritdoc
             */
            Container.prototype.empty = function () {
                return this.size() == 0;
            };
            return Container;
        }());
        base.Container = Container;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
//# sourceMappingURL=Container.js.map