import { CancelExcutor, CancelTokenSource } from '../types';
import Cancel from './cancel';
export default class CancelToken {
    promise: Promise<Cancel>;
    reason?: Cancel;
    constructor(excutor: CancelExcutor);
    throwIfRequest(): void;
    static source(): CancelTokenSource;
}
