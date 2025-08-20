import {ObjectUtility} from "./object";


export namespace UrlUtility {

    export function paramsObject<T>(searchParams: string) {
        if (searchParams) {
            searchParams = searchParams.trim()
            const out: T = {} as T;
            const f = searchParams.substring(0, 1);

            (f == '?' ? searchParams.substring(1) : searchParams).split('&').forEach(param => {
                const eq = param.split('=')
                const name = eq[0] as keyof T;
                if (name != 'child') {
                    out[name] = (eq[1]) as any
                }
            })
            return out;
        }
        return undefined;
    }

    export function urlParams<T extends object>(params: T): string {
        return ObjectUtility.toString(params, {eq: '=', joiner: '&'})
    }

}
