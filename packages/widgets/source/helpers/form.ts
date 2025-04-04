export function formDataToObject<T extends Object>(payload: FormData): T {
    const accumulate = {} as T;
    payload.forEach((value, key) => {
        if (accumulate.hasOwnProperty(key)) {
            if (!Array.isArray(accumulate[key]))
                accumulate[key] = [accumulate[key]]
            accumulate[key].push(value);
        } else {
            accumulate[key] = value;
        }
    });
    return accumulate;
}
