import { CoreAppearance } from "../supports/index.js";
export function createAppearance(stylesheet) {
    return useAppearance().sheet(stylesheet);
}
export function useAppearance() {
    return (new CoreAppearance());
}
