import { AxiosTransformer } from './../types/index';
// 转译文件
export default function transform(data: any, headers: any, fns?: AxiosTransformer | AxiosTransformer[]): any {
    if (!fns) return data;

    if (!Array.isArray(fns)) {
        fns = [fns];
    }

    fns.forEach(fn => {
        data = fn(data, headers);
    })

    return data;
}





