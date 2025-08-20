export function revealType(value: any): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';


    if (typeof value === 'string') {
        const val = value.trim().toLowerCase();

        if (val === 'null') return 'null';
        if (val === 'undefined') return 'undefined';
        if (val === 'true' || val === 'false') return 'boolean';
        if (!isNaN(Number(val)) && val !== '') return 'number';
        if (/^\d+n$/.test(val)) return 'bigint';

        try {
            const parsed = JSON.parse(value);
            return revealType(parsed);
        } catch {
        }

        return 'string';
    }

    if (typeof value === 'boolean') return 'boolean';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'bigint') return 'bigint';
    if (typeof value === 'symbol') return 'symbol';
    if (typeof value === 'function') return 'function';

    if (Array.isArray(value)) return 'array';
    if (value instanceof Date) return 'date';
    if (value instanceof RegExp) return 'regexp';
    if (typeof value === 'object') return 'object';

    return typeof value;
}