import {ThemeAvatarProps} from "../avatar/type.js";

export interface ThemeAvatarsProps extends Omit<ThemeAvatarProps, 'source'> {
    sources?: string[];
}