// 工具方法
const toString = Object.prototype.toString;

// 时间判断
export function isDate(val: any): val is Date {
    return toString.call(val) === '[object Date]';
};

// 对象判断
export function isObject(val: any): val is Object {
    return val !== null && typeof val === 'object';
}

// 对象判断
export function isPlainObject(val: any): val is Object {
    return toString.call(val) === '[object Object]';
}

// 混合对象
export function extend<T, U>(to: T, from: U): T & U {
    for (const key in from) {
        ;(to as T & U)[key] = from[key] as any;
    }
    return to as T & U;
}

// 深层 merge 方法
export function deepMerge(...objs: any[]): any {
    const result = Object.create(null);
    objs.forEach(obj => {
        if (obj) {
            Object.keys(obj).forEach(key => {
                const val = obj[key];
                if (isPlainObject(val)) {
                    if (isPlainObject(result[key])) {
                        result[key] = deepMerge(result[key], val);
                    } else {
                        result[key] = deepMerge(val);
                    }
                } else {
                    result[key] = val;
                }
            })
        }
    })
    return result;
}

// 判断FormData
export function isFormData(val: any): val is FormData {
    return typeof val !== 'undefined' && val instanceof FormData;
}

// 判断是否是序列化的实例
export function isURLSearchParams(val: any): val is URLSearchParams {
    return typeof val !== 'undefined' && val instanceof URLSearchParams;
}
