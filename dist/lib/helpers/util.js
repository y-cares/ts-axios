"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 工具方法
var toString = Object.prototype.toString;
// 时间判断
function isDate(val) {
    return toString.call(val) === '[object Date]';
}
exports.isDate = isDate;
;
// 对象判断
function isObject(val) {
    return val !== null && typeof val === 'object';
}
exports.isObject = isObject;
// 对象判断
function isPlainObject(val) {
    return toString.call(val) === '[object Object]';
}
exports.isPlainObject = isPlainObject;
// 混合对象
function extend(to, from) {
    for (var key in from) {
        ;
        to[key] = from[key];
    }
    return to;
}
exports.extend = extend;
// 深层 merge 方法
function deepMerge() {
    var objs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objs[_i] = arguments[_i];
    }
    var result = Object.create(null);
    objs.forEach(function (obj) {
        if (obj) {
            Object.keys(obj).forEach(function (key) {
                var val = obj[key];
                if (isPlainObject(val)) {
                    if (isPlainObject(result[key])) {
                        result[key] = deepMerge(result[key], val);
                    }
                    else {
                        result[key] = deepMerge(val);
                    }
                }
                else {
                    result[key] = val;
                }
            });
        }
    });
    return result;
}
exports.deepMerge = deepMerge;
// 判断FormData
function isFormData(val) {
    return typeof val !== 'undefined' && val instanceof FormData;
}
exports.isFormData = isFormData;
// 判断是否是序列化的实例
function isURLSearchParams(val) {
    return typeof val !== 'undefined' && val instanceof URLSearchParams;
}
exports.isURLSearchParams = isURLSearchParams;
//# sourceMappingURL=util.js.map