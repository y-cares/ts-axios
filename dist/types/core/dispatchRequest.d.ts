import { AxiosRequestConfig, AxiosPromise } from '../types';
declare function dispatchRequest(config: AxiosRequestConfig): AxiosPromise;
export declare function transformURL(config: AxiosRequestConfig): string;
export default dispatchRequest;
