// axios 核心文件
// axios 对象
import {
    AxiosRequestConfig,
    AxiosPromise,
    Method,
    AxiosResponse,
    ResolveFn,
    RejectedFn
} from '../types';
import InterceptorManager from './interceptorManager';
import dispatchRequest, { transformURL } from './dispatchRequest';
import mergeConfig from './mergeConfig';

interface Interceptors {
    request: InterceptorManager<AxiosRequestConfig>
    response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
    resolved: ResolveFn<T> | ((config: AxiosRequestConfig) => AxiosPromise);
    rejected?: RejectedFn;
}

export default class Axios {
    // 默认配置
    defaults: AxiosRequestConfig;

    // 拦截器
    interceptors: Interceptors;

    constructor(initConfig: AxiosRequestConfig) {
        this.defaults = initConfig;
        this.interceptors = {
            request: new InterceptorManager<AxiosRequestConfig>(),
            response: new InterceptorManager<AxiosResponse>()
        }
    }

    // 请求方式
    request(url: any, config?: any): AxiosPromise {
        if (typeof url === 'string') {
            if (!config) config = {};
            config.url = url;
        } else {
            config = url;
        }

        // 合并配置
        config = mergeConfig(this.defaults, config);
        config.method = config.method.toLowerCase()

        // 链式调用
        const chain: PromiseChain<any>[] = [{
            resolved: dispatchRequest,
            rejected: undefined
        }]

        // 请求拦截
        this.interceptors.request.forEach(interceptor => {
            chain.unshift(interceptor);
        })

        // 响应拦截
        this.interceptors.response.forEach(interceptor => {
            chain.push(interceptor);
        })

        let promise = Promise.resolve(config);

        while (chain.length) {
            const { resolved, rejected} = chain.shift()!;
            promise = promise.then(resolved, rejected);
        }

        // return dispatchRequest(config);
        return promise;
    }
    
    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('get', url, config);
    }

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('delete', url, config);
    }

    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('delete', url, config);
    }

    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('delete', url, config);
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('delete', url, data, config);
    }

    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('delete', url, data, config);
    }

    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('delete', url, data, config);
    }

    getUri(config?: AxiosRequestConfig): string {
        config = mergeConfig(this.defaults, config);
        return transformURL(config);
    }

    _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
        return this.request(Object.assign(config || {}, {
            method,
            url
        }))
    }

    _requestMethodWithData(method: Method, url: string, data: any, config?: AxiosRequestConfig) {
        return this.request(Object.assign(config || {}, {
            method,
            url,
            data
        }))
    }
}
