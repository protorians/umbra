import { Climbing } from "../supports/index.js";
export function useClimbing(entries, callback) {
    return new Climbing(entries, callback);
}
