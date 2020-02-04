// axios 初始化文件
import { AxiosStatic, AxiosRequestConfig } from './types/index';
import Axios from './core/Axios';
import { extend } from './helpers/util';
import defaults from './defaults';
import mergeConfig from './core/mergeConfig';
import CancelToken from './cancel/cancelToken';
import Cancel, { isCancel } from './cancel/cancel';

function createInstance(config: AxiosRequestConfig): AxiosStatic {
    const context = new Axios(config);
    const instance = Axios.prototype.request.bind(context);

    extend(instance, context);

    return instance as AxiosStatic;
}

// 初始化 axios
const axios = createInstance(defaults);

// create 新建一个 axios 实例
axios.create = function create(config) {
    return createInstance(mergeConfig(defaults, config));
}

// 取消请求
axios.CancelToken = CancelToken;
axios.Cancel = Cancel;
axios.isCancel = isCancel;

axios.all = function all(promises) {
    return Promise.all(promises);
}

axios.spread = function spread(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr);
    }
}

axios.Axios = Axios;

export default axios;