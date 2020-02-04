// 拦截器类
import {ResolveFn, RejectedFn} from '../types';
interface Interceptor<T> {
    resolved: ResolveFn<T>;
    rejected?: RejectedFn;
}

export default class InterceptorManager<T> {
    private interceptors: Array<Interceptor<T> | null>;
    constructor() {
        this.interceptors = [];
    }

    // 添加拦截器
    use(resolved: ResolveFn<T>, rejected: RejectedFn): number {
        this.interceptors.push({
            resolved,
            rejected
        })
        return this.interceptors.length - 1;
    }

    // 暴露已添加的拦截器
    forEach(fn: (interceptor: Interceptor<T>) => void): void {
        this.interceptors.forEach(interceptor => {
            if (interceptor !== null) {
                fn(interceptor);
            }
        })
    }

    // 删除指定拦截器
    eject(id: number): void {
        if (this.interceptors[id]) {
            this.interceptors[id] = null;
        }
    }

}