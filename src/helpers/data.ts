import {
    isPlainObject
} from './util';
// data 转化请求参数
export function transformRequest(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data);
    }
    return data;
}

// 转译响应数据
export function transformResponse(data: any): any {
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data)
        } catch (error) {
            // do nothing
        }
    }
    return data;
}