import type {IAppearanceStyleSheet} from "../types";
import {CoreAppearance} from "../supports";


export function createAppearance(stylesheet: IAppearanceStyleSheet) {
  return useAppearance().sheet(stylesheet)
}
export function useAppearance() {
  return (new CoreAppearance())
}