// 默认配置
import { AxiosRequestConfig } from './types';
import { processHeaders } from './helpers/headers';
import { transformRequest, transformResponse } from './helpers/data';

// axios 的默认配置
const defaults: AxiosRequestConfig = {
    method: 'get',
    timeout: 0,
    headers: {
        common: {
            Accept: 'application/json, text/plain, */*'
        }
    },

    // transformRequest 允许在向服务器发送前，修改请求数据
    transformRequest: [
        function(data: any, headers: any): any {
            processHeaders(headers, data);
            return transformRequest(data)
        }
    ],
    // transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [
        function(data: any): any {
            return transformResponse(data);
        }
    ],

    // xsrf 防御
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',

    // 默认的合法状态码的校验规则
    validateStatus(status: number): boolean {
        return status >= 200 && status < 300;
    }

};

const methodsNoData = ['delete', 'get', 'head', 'options'];
methodsNoData.forEach(method => {
    defaults.headers[method] = {};
});

const methodsData = ['post', 'put', 'patch'];
methodsData.forEach(method => {
    defaults.headers[method] = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
});

export default defaults;

