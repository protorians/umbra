import {AligningDirection, IWidgetNode, ObjectRounded, ObjectSize} from "@protorians/widgets";


export interface ThemeAvatarOptions {
    source?: string;
    direction?: AligningDirection;
    rounded?: ObjectRounded;
    size?: ObjectSize | number;
    loader?: IWidgetNode<any, any>;
    fallback?: IWidgetNode<any, any>;
    borderless?: boolean;
}