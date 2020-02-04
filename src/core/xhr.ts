// axios 请求逻辑
import {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosPromise
} from '../types';
import { parseHeaders } from '../helpers/headers';
import { createError } from '../helpers/error';
import { isURLSameOrigin } from '../helpers/url';
import cookie from '../helpers/cookie';
import { isFormData } from '../helpers/util';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {

        const {
            data = null,
            url,
            method = 'get',
            headers,
            responseType,
            timeout,
            cancelToken,
            withCredentials,
            xsrfCookieName,
            xsrfHeaderName,
            onDownloadProgress,
            onUploadProgress,
            auth,
            validateStatus
        } = config;

        const request = new XMLHttpRequest();

        request.open(method.toUpperCase(), url!, true);

        configureRequest();

        addEvents();

        processHeaders();

        processCancel();

        request.send(data);

        function configureRequest(): void {
            if (responseType) {
                request.responseType = responseType;
            }
    
            if (timeout) request.timeout = timeout;
    
            // 跨域请求
            if (withCredentials) request.withCredentials = withCredentials;
        }

        function addEvents(): void {
            request.onreadystatechange = function handleLoad() {
                if (request.readyState !== 4) return;
    
                if (request.status === 0) return;
    
                const responseHeaders = parseHeaders(request.getAllResponseHeaders());
                const responseData = responseType !== 'text' ? request.response : request.responseText;
                const response: AxiosResponse = {
                    data: responseData,
                    status: request.status,
                    statusText: request.statusText,
                    headers: responseHeaders,
                    config,
                    request
                }
                handleResponse(response);
            }
    
            request.onerror = function handleError() {
                reject(createError(
                    'Network Error',
                    config,
                    null,
                    request
                ));
            }
            
            // 请求超时
            request.ontimeout = function handleTimeout() {
                reject(createError(
                    `Timeout of ${timeout} ms exceeded`,
                    config,
                    'ECONNABORTED',
                    request
                ));
            }
    
            // 下载进度监控
            if (onDownloadProgress) request.onprogress = onDownloadProgress;
    
            // 上传进度监控
            if (onUploadProgress) request.upload.onprogress = onUploadProgress;
        }

        function processHeaders(): void {
            if (isFormData(data)) delete headers['Content-Type'];

            // xsrf 防御
            if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
                const xsrfValue = cookie.read(xsrfCookieName);
                if (xsrfValue && xsrfHeaderName) {
                    headers[xsrfHeaderName] = xsrfValue;
                }
            }

            // http授权
            if (auth) {
                headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password);
            }

            Object.keys(headers).forEach(name => {
                if (data === null && name.toLowerCase() === 'content-type') {
                    delete headers[name];
                } else {
                    request.setRequestHeader(name, headers[name]);
                }
            });
        }

        function processCancel(): void {
            // 取消请求
            if (cancelToken) {
                cancelToken.promise.then(reason => {
                    request.abort();
                    reject(reason);
                }).catch(
                    /* istanbul ignore next */
                    () => {
                    // do nothing
                })
            }
        }

        function handleResponse(response: AxiosResponse): void {
            if (!validateStatus || validateStatus(response.status)) {
                resolve(response);
            } else {
                reject(createError(
                    `Request failed with status code ${response.status}`,
                    config,
                    null,
                    request,
                    response
                ))
            }
        }
    });
}

