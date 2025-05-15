import {AligningDirection, IWidgetNode, ObjectRounded, ObjectSize} from "@protorians/widgets";


export interface ThemeAvatarProps {
    source?: string;
    direction?: AligningDirection;
    rounded?: ObjectRounded;
    size?: ObjectSize | number;
    loader?: IWidgetNode<any, any>;
    fallback?: IWidgetNode<any, any>;
    borderless?: boolean;
}