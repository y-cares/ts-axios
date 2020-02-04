"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../helpers/util");
var strats = Object.create(null);
// 默认配置项
function defaultStrat(val1, val2) {
    return typeof val2 !== 'undefined' ? val2 : val1;
}
// 区后一个配置项的配置
function fromVal2Strat(val1, val2) {
    if (typeof val2 !== 'undefined')
        return val2;
}
// 深度合并配置项
function deepMergeStrat(val1, val2) {
    if (util_1.isPlainObject(val2)) {
        return util_1.deepMerge(val1, val2);
    }
    else if (typeof val2 !== 'undefined') {
        return val2;
    }
    else if (util_1.isPlainObject(val1)) {
        return util_1.deepMerge(val1);
    }
    else if (typeof val1 !== 'undefined') {
        return val1;
    }
}
var stratKeysFromVal2 = ['url', 'params', 'data'];
stratKeysFromVal2.forEach(function (key) {
    strats[key] = fromVal2Strat;
});
var stratKeysDeepMerge = ['headers', 'auth'];
stratKeysDeepMerge.forEach(function (key) {
    strats[key] = deepMergeStrat;
});
// 合并配置项
function mergeConfig(config1, config2) {
    if (!config2)
        config2 = {};
    var config = Object.create(null);
    for (var key in config2) {
        mergeField(key);
    }
    for (var key in config1) {
        if (!config2[key])
            mergeField(key);
    }
    function mergeField(key) {
        var strat = strats[key] || defaultStrat;
        config[key] = strat(config1[key], config2[key]);
    }
    return config;
}
exports.default = mergeConfig;
//# sourceMappingURL=mergeConfig.js.map