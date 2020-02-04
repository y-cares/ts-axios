// 取消请求Token文件
import { CancelExcutor, CancelTokenSource, Canceler } from '../types';
import Cancel from './cancel';

interface ResolvePromise {
    (reason?: Cancel): void;
}

export default class CancelToken {
    promise: Promise<Cancel>;
    reason?: Cancel;

    constructor(excutor: CancelExcutor) {
        let resolvePromise: ResolvePromise;

        this.promise = new Promise<Cancel>(resolve => {
            resolvePromise = resolve;
        })

        excutor(message => {
            if (this.reason) return;
            this.reason = new Cancel(message);
            // 将 promise 从 pedding 状态进入到 resolve 状态
            resolvePromise(this.reason);
        })
    }

    throwIfRequest() {
        if (this.reason) {
            throw this.reason;
        }
    }

    static source(): CancelTokenSource {
        let cancel!: Canceler;
        const token = new CancelToken(c => {
            cancel = c;
        });
        return {
            cancel,
            token
        }
    }
}

