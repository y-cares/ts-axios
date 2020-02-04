// 请求前 配置
import {
    AxiosRequestConfig,
    AxiosPromise,
    AxiosResponse
} from '../types';
import { buildUrl, isAbsoluteURL, combineURL } from '../helpers/url';
import { flattenHeaders } from '../helpers/headers';
import transform from './transform';
import xhr from './xhr';

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    throwIfCancellationRequested(config);
    processConfig(config);
    return xhr(config).then(res => {
        return transformResponseData(res);
    },
    e => {
        if (e && e.response) {
          e.response = transformResponseData(e.response)
        }
        return Promise.reject(e)
    });
};

function processConfig(config: AxiosRequestConfig): void {
    config.url = transformURL(config);
    config.data = transform(config.data, config.headers, config.transformRequest);
    config.headers = flattenHeaders(config.headers, config.method!);
}

export function transformURL(config: AxiosRequestConfig): string {
    let { url, params, paramsSerialize, baseURL} = config;
    if (baseURL && !isAbsoluteURL(url!)) {
        url = combineURL(baseURL, url);
    }
    return buildUrl(url!, params, paramsSerialize);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
    res.data = transform(res.data, res.headers, res.config.transformResponse);
    return res;
}

// 取消请求报错提示
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequest();
    }
}

export default dispatchRequest;
