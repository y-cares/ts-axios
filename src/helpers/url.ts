// 处理 url 的辅助方法
import {
    isDate,
    isPlainObject,
    isURLSearchParams
} from './util';

interface URLOrigin {
    protocol: string;
    host: string;
}

function enCode(val: string): string {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/ig, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/ig, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/ig, '[')
        .replace(/%5D/ig, ']')
}

export function buildUrl(url: string, params?: any, paramsSerialize?: (params: any) => string): string {
    if (!params) return url;

    let serializedParams;

    // 自定义参数序列化规则
    if (paramsSerialize) {
        serializedParams = paramsSerialize(params)
    } else if (isURLSearchParams(params)) {
        serializedParams = params.toString();
    } else {
        const parts: string[] = [];

        Object.keys(params).forEach(key => {
            const val = params[key];
            if (val === null || typeof val === 'undefined') return;
            let values = [];
            if (Array.isArray(val)) {
                values = val;
                key += '[]';
            } else {
                values = [val];
            };
            values.forEach(val => {
                if (isDate(val)) {
                    val = val.toISOString();
                } else if (isPlainObject(val)) {
                    val = JSON.stringify(val);
                }
                parts.push(`${enCode(key)}=${enCode(val)}`);
            })
        });
    
        serializedParams = parts.join('&');
    }

    if (serializedParams) {
        const marIndex = url.indexOf('#');
        if (marIndex !== -1) {
            url = url.slice(0, marIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
};

// 判断是否是绝对路径
export function isAbsoluteURL(url: string): boolean {
    return /(^[a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}

export function combineURL(baseURL: string, relativeURL?: string): string {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
}

// 判断是否是同源请求
export function isURLSameOrigin(requestURL: string): boolean{
    const parseOrigin = resolveURL(requestURL);
    return ((parseOrigin.protocol === currentOrigin.protocol) && (parseOrigin.host === currentOrigin.host));
}

const urlParsingNode = document.createElement('a');
const currentOrigin = resolveURL(window.location.href);

function resolveURL(url: string): URLOrigin {
    urlParsingNode.setAttribute('href', url);
    const { protocol, host } = urlParsingNode;
    return {
        protocol,
        host
    }
}
