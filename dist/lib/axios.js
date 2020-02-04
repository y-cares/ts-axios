"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Axios_1 = require("./core/Axios");
var util_1 = require("./helpers/util");
var defaults_1 = require("./defaults");
var mergeConfig_1 = require("./core/mergeConfig");
var cancelToken_1 = require("./cancel/cancelToken");
var cancel_1 = require("./cancel/cancel");
function createInstance(config) {
    var context = new Axios_1.default(config);
    var instance = Axios_1.default.prototype.request.bind(context);
    util_1.extend(instance, context);
    return instance;
}
// 初始化 axios
var axios = createInstance(defaults_1.default);
// create 新建一个 axios 实例
axios.create = function create(config) {
    return createInstance(mergeConfig_1.default(defaults_1.default, config));
};
// 取消请求
axios.CancelToken = cancelToken_1.default;
axios.Cancel = cancel_1.default;
axios.isCancel = cancel_1.isCancel;
axios.all = function all(promises) {
    return Promise.all(promises);
};
axios.spread = function spread(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr);
    };
};
axios.Axios = Axios_1.default;
exports.default = axios;
//# sourceMappingURL=axios.js.map