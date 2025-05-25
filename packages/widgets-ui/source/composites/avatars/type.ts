import {ThemeAvatarOptions} from "../avatar/type.js";

export interface ThemeAvatarsOptions extends Omit<ThemeAvatarOptions, 'source'> {
    sources?: string[];
}