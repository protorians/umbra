import {IWidgetElement, IWidgetProps} from "../types";

export const supportsElement = typeof Element !== 'undefined';


export class WidgetElement implements IWidgetElement {

    constructor(
        public readonly tag: string,
        public readonly props: IWidgetProps
    ) {
    }

}