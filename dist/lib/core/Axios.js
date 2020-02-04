"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interceptorManager_1 = require("./interceptorManager");
var dispatchRequest_1 = require("./dispatchRequest");
var mergeConfig_1 = require("./mergeConfig");
var Axios = /** @class */ (function () {
    function Axios(initConfig) {
        this.defaults = initConfig;
        this.interceptors = {
            request: new interceptorManager_1.default(),
            response: new interceptorManager_1.default()
        };
    }
    // 请求方式
    Axios.prototype.request = function (url, config) {
        if (typeof url === 'string') {
            if (!config)
                config = {};
            config.url = url;
        }
        else {
            config = url;
        }
        // 合并配置
        config = mergeConfig_1.default(this.defaults, config);
        config.method = config.method.toLowerCase();
        // 链式调用
        var chain = [{
                resolved: dispatchRequest_1.default,
                rejected: undefined
            }];
        // 请求拦截
        this.interceptors.request.forEach(function (interceptor) {
            chain.unshift(interceptor);
        });
        // 响应拦截
        this.interceptors.response.forEach(function (interceptor) {
            chain.push(interceptor);
        });
        var promise = Promise.resolve(config);
        while (chain.length) {
            var _a = chain.shift(), resolved = _a.resolved, rejected = _a.rejected;
            promise = promise.then(resolved, rejected);
        }
        // return dispatchRequest(config);
        return promise;
    };
    Axios.prototype.get = function (url, config) {
        return this._requestMethodWithoutData('get', url, config);
    };
    Axios.prototype.delete = function (url, config) {
        return this._requestMethodWithoutData('delete', url, config);
    };
    Axios.prototype.head = function (url, config) {
        return this._requestMethodWithoutData('delete', url, config);
    };
    Axios.prototype.options = function (url, config) {
        return this._requestMethodWithoutData('delete', url, config);
    };
    Axios.prototype.post = function (url, data, config) {
        return this._requestMethodWithData('delete', url, data, config);
    };
    Axios.prototype.put = function (url, data, config) {
        return this._requestMethodWithData('delete', url, data, config);
    };
    Axios.prototype.patch = function (url, data, config) {
        return this._requestMethodWithData('delete', url, data, config);
    };
    Axios.prototype.getUri = function (config) {
        config = mergeConfig_1.default(this.defaults, config);
        return dispatchRequest_1.transformURL(config);
    };
    Axios.prototype._requestMethodWithoutData = function (method, url, config) {
        return this.request(Object.assign(config || {}, {
            method: method,
            url: url
        }));
    };
    Axios.prototype._requestMethodWithData = function (method, url, data, config) {
        return this.request(Object.assign(config || {}, {
            method: method,
            url: url,
            data: data
        }));
    };
    return Axios;
}());
exports.default = Axios;
//# sourceMappingURL=Axios.js.map