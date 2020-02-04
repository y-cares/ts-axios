"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var headers_1 = require("./helpers/headers");
var data_1 = require("./helpers/data");
// axios 的默认配置
var defaults = {
    method: 'get',
    timeout: 0,
    headers: {
        common: {
            Accept: 'application/json, text/plain, */*'
        }
    },
    // transformRequest 允许在向服务器发送前，修改请求数据
    transformRequest: [
        function (data, headers) {
            headers_1.processHeaders(headers, data);
            return data_1.transformRequest(data);
        }
    ],
    // transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [
        function (data) {
            return data_1.transformResponse(data);
        }
    ],
    // xsrf 防御
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    // 默认的合法状态码的校验规则
    validateStatus: function (status) {
        return status >= 200 && status < 300;
    }
};
var methodsNoData = ['delete', 'get', 'head', 'options'];
methodsNoData.forEach(function (method) {
    defaults.headers[method] = {};
});
var methodsData = ['post', 'put', 'patch'];
methodsData.forEach(function (method) {
    defaults.headers[method] = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
});
exports.default = defaults;
//# sourceMappingURL=defaults.js.map