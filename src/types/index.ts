// 公共类型定义文件
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

// 请求接口配置参数
export interface AxiosRequestConfig {
    url?: string;
    method?: Method;
    data?: any;
    params?: any;
    headers?: any;
    responseType?: XMLHttpRequestResponseType;
    timeout?: number;
    transformRequest?: AxiosTransformer | AxiosTransformer[];
    transformResponse?: AxiosTransformer | AxiosTransformer[];
    cancelToken?: CancelToken;
    withCredentials?: boolean;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    onDownloadProgress?: (e: ProgressEvent) => void;
    onUploadProgress?: (e: ProgressEvent) => void;
    auth?: AxiosBasicCredentials;
    validateStatus?: (status: number) => boolean;
    paramsSerialize?: (params: any) => string;
    baseURL?: string;

    [propName: string]: any;
}

// 响应接口配置参数
export interface AxiosResponse<T=any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request: any;
}
export interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>> {}

// 报错接口配置参数
export interface AxiosError extends Error {
    isAxiosError: boolean;
    config: AxiosRequestConfig;
    code?: string | null;
    request?: any;
    response?: AxiosResponse;
}
// axios 配置参数
export interface Axios {
    defaults: AxiosRequestConfig;

    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>
    }

    request<T=any>(config: AxiosRequestConfig): AxiosPromise<T>;

    get<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

    delete<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

    head<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

    options<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

    post<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;

    put<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;

    patch<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;

    getUri(config?: AxiosRequestConfig): string;
}

// 拦截器配置参数
export interface AxiosInstance extends Axios {
    <T=any>(config: AxiosRequestConfig): AxiosPromise<T>;

    <T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
}

export interface AxiosClassStatic {
    new (config: AxiosRequestConfig): Axios;
}

// 拦截器接口管理参数
export interface AxiosInterceptorManager<T> {
    use(resolved: ResolveFn<T>, rejected?: RejectedFn): number;

    eject(id: number): void;
}

// 成功配置参数
export interface ResolveFn<T> {
    (val: T): T | Promise<T>;
}

// 失败配置参数
export interface RejectedFn {
    (error: any): any;
}

// axios transform 配置参数
export interface AxiosTransformer {
    (data: any, headers?: any): any;
}

// axios 静态接口
export interface AxiosStatic extends AxiosInstance {
    create(config?: AxiosRequestConfig): AxiosInstance;

    CancelToken: CancelTokenStatic;
    Cancel: CancelStatic;
    isCancel: (value: any) => boolean;

    all<T>(promises: Array<T | Promise<T>>): Promise<T[]>;

    spread<T, R>(callback: (...args: T[]) => R): (args: T[]) => R;

    Axios: AxiosClassStatic;
}

// 取消接口
export interface Cancel {
    message?: string
}

export interface CancelStatic {
    new(message?: string): Cancel;
}

// 取消接口 Token
export interface CancelToken {
    promise: Promise<Cancel>;
    reason?: Cancel;

    throwIfRequest(): void;
}

// 取消方法接口
export interface Canceler {
    (message?: string): void;
}

// 传给 cancelToken 构造函数的参数类型
export interface CancelExcutor {
    (cancel: Canceler): void;
}

// 扩展取消接口
export interface CancelTokenSource {
    token: CancelToken;
    cancel: Canceler;
}

// 取消静态接口
export interface CancelTokenStatic {
    new(excutor: CancelExcutor): CancelToken;
    source(): CancelTokenSource;
}

export interface AxiosBasicCredentials {
    username: string;
    password: string;
}

