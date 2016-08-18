/// <reference path="../API.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        /**
         * An abstract container
         * 추상 컨테이너
         *
         * @param <T> TYpe of elements
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
            Container.prototype.empty = function () {
                return this.size() == 0;
            };
            return Container;
        }());
        base.Container = Container;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
//# sourceMappingURL=Container.js.map