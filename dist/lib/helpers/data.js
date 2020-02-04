"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
// data 转化请求参数
function transformRequest(data) {
    if (util_1.isPlainObject(data)) {
        return JSON.stringify(data);
    }
    return data;
}
exports.transformRequest = transformRequest;
// 转译响应数据
function transformResponse(data) {
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        }
        catch (error) {
            // do nothing
        }
    }
    return data;
}
exports.transformResponse = transformResponse;
//# sourceMappingURL=data.js.map