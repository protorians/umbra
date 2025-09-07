export function formDataToObject(payload) {
    const accumulate = {};
    payload.forEach((value, key) => {
        if (accumulate.hasOwnProperty(key)) {
            if (!Array.isArray(accumulate[key]))
                accumulate[key] = [accumulate[key]];
            accumulate[key].push(value);
        }
        else {
            accumulate[key] = value;
        }
    });
    return accumulate;
}
