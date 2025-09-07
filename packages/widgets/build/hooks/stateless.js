import { StateWidget } from "./state.js";
export function useStateless(composite, dependencies) {
    const props = {};
    Object.entries(dependencies).forEach(([key, value]) => props[key] = (value instanceof StateWidget ? value.value : value));
    return composite(props);
}
