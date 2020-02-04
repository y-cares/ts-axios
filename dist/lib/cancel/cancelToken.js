"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cancel_1 = require("./cancel");
var CancelToken = /** @class */ (function () {
    function CancelToken(excutor) {
        var _this = this;
        var resolvePromise;
        this.promise = new Promise(function (resolve) {
            resolvePromise = resolve;
        });
        excutor(function (message) {
            if (_this.reason)
                return;
            _this.reason = new cancel_1.default(message);
            // 将 promise 从 pedding 状态进入到 resolve 状态
            resolvePromise(_this.reason);
        });
    }
    CancelToken.prototype.throwIfRequest = function () {
        if (this.reason) {
            throw this.reason;
        }
    };
    CancelToken.source = function () {
        var cancel;
        var token = new CancelToken(function (c) {
            cancel = c;
        });
        return {
            cancel: cancel,
            token: token
        };
    };
    return CancelToken;
}());
exports.default = CancelToken;
//# sourceMappingURL=cancelToken.js.map