import { ResolveFn, RejectedFn } from '../types';
interface Interceptor<T> {
    resolved: ResolveFn<T>;
    rejected?: RejectedFn;
}
export default class InterceptorManager<T> {
    private interceptors;
    constructor();
    use(resolved: ResolveFn<T>, rejected: RejectedFn): number;
    forEach(fn: (interceptor: Interceptor<T>) => void): void;
    eject(id: number): void;
}
export {};
