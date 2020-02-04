import { Method } from '../types';
import {
    isPlainObject,
    deepMerge
} from './util';

function normalizeHeaderName(headers: any, normalizeName: string): void {
    if (!headers) return;
    Object.keys(headers).forEach(name => {
        if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
            headers[normalizeName] = headers[name];
            delete headers[name];
        }
    })
}

// 统一 headers 的格式
export function processHeaders(headers: any, data: any): any {
    normalizeHeaderName(headers, 'Content-Type');
    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8;';
        }
    }
    return headers;
}

// 转译返回的 headers 的格式
export function parseHeaders(headers: string): any {
    let parsed = Object.create(null);
    if (!headers) return parsed;
    headers.split('\r\n').forEach(line => {
        let [key, ...vals] = line.split(':');
        key = key.trim().toLowerCase();
        if (!key) return;
        const val = vals.join(':').trim();
        parsed[key] = val;
    })
    return parsed;
}

// 合并 headers
export function flattenHeaders(headers: any, method: Method):any {
    if (!headers) return headers;

    headers = deepMerge(headers.common, headers[method], headers);

    const methodsToDelete = ['delete', 'get', 'head', 'optioms', 'post', 'put', 'patch', 'common'];

    methodsToDelete.forEach(method => {
        delete headers[method];
    })

    return headers;
}
