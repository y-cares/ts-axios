"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InterceptorManager = /** @class */ (function () {
    function InterceptorManager() {
        this.interceptors = [];
    }
    // 添加拦截器
    InterceptorManager.prototype.use = function (resolved, rejected) {
        this.interceptors.push({
            resolved: resolved,
            rejected: rejected
        });
        return this.interceptors.length - 1;
    };
    // 暴露已添加的拦截器
    InterceptorManager.prototype.forEach = function (fn) {
        this.interceptors.forEach(function (interceptor) {
            if (interceptor !== null) {
                fn(interceptor);
            }
        });
    };
    // 删除指定拦截器
    InterceptorManager.prototype.eject = function (id) {
        if (this.interceptors[id]) {
            this.interceptors[id] = null;
        }
    };
    return InterceptorManager;
}());
exports.default = InterceptorManager;
//# sourceMappingURL=interceptorManager.js.map