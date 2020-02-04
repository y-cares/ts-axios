"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 处理 url 的辅助方法
var util_1 = require("./util");
function enCode(val) {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/ig, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/ig, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/ig, '[')
        .replace(/%5D/ig, ']');
}
function buildUrl(url, params, paramsSerialize) {
    if (!params)
        return url;
    var serializedParams;
    // 自定义参数序列化规则
    if (paramsSerialize) {
        serializedParams = paramsSerialize(params);
    }
    else if (util_1.isURLSearchParams(params)) {
        serializedParams = params.toString();
    }
    else {
        var parts_1 = [];
        Object.keys(params).forEach(function (key) {
            var val = params[key];
            if (val === null || typeof val === 'undefined')
                return;
            var values = [];
            if (Array.isArray(val)) {
                values = val;
                key += '[]';
            }
            else {
                values = [val];
            }
            ;
            values.forEach(function (val) {
                if (util_1.isDate(val)) {
                    val = val.toISOString();
                }
                else if (util_1.isPlainObject(val)) {
                    val = JSON.stringify(val);
                }
                parts_1.push(enCode(key) + "=" + enCode(val));
            });
        });
        serializedParams = parts_1.join('&');
    }
    if (serializedParams) {
        var marIndex = url.indexOf('#');
        if (marIndex !== -1) {
            url = url.slice(0, marIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
}
exports.buildUrl = buildUrl;
;
// 判断是否是绝对路径
function isAbsoluteURL(url) {
    return /(^[a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}
exports.isAbsoluteURL = isAbsoluteURL;
function combineURL(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
}
exports.combineURL = combineURL;
// 判断是否是同源请求
function isURLSameOrigin(requestURL) {
    var parseOrigin = resolveURL(requestURL);
    return ((parseOrigin.protocol === currentOrigin.protocol) && (parseOrigin.host === currentOrigin.host));
}
exports.isURLSameOrigin = isURLSameOrigin;
var urlParsingNode = document.createElement('a');
var currentOrigin = resolveURL(window.location.href);
function resolveURL(url) {
    urlParsingNode.setAttribute('href', url);
    var protocol = urlParsingNode.protocol, host = urlParsingNode.host;
    return {
        protocol: protocol,
        host: host
    };
}
//# sourceMappingURL=url.js.map