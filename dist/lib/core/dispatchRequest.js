"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("../helpers/url");
var headers_1 = require("../helpers/headers");
var transform_1 = require("./transform");
var xhr_1 = require("./xhr");
function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    processConfig(config);
    return xhr_1.default(config).then(function (res) {
        return transformResponseData(res);
    }, function (e) {
        if (e && e.response) {
            e.response = transformResponseData(e.response);
        }
        return Promise.reject(e);
    });
}
;
function processConfig(config) {
    config.url = transformURL(config);
    config.data = transform_1.default(config.data, config.headers, config.transformRequest);
    config.headers = headers_1.flattenHeaders(config.headers, config.method);
}
function transformURL(config) {
    var url = config.url, params = config.params, paramsSerialize = config.paramsSerialize, baseURL = config.baseURL;
    if (baseURL && !url_1.isAbsoluteURL(url)) {
        url = url_1.combineURL(baseURL, url);
    }
    return url_1.buildUrl(url, params, paramsSerialize);
}
exports.transformURL = transformURL;
function transformResponseData(res) {
    res.data = transform_1.default(res.data, res.headers, res.config.transformResponse);
    return res;
}
// 取消请求报错提示
function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequest();
    }
}
exports.default = dispatchRequest;
//# sourceMappingURL=dispatchRequest.js.map