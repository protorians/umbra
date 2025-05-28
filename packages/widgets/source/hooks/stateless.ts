import {IAttributes, IComposite, IStatelessProps, IWidgetNode} from "../types/index.js";
import {StateWidget} from "./state.js";


export function useStateless<Props extends Record<string, any>, E extends HTMLElement, A extends IAttributes>(
    composite: IComposite<IStatelessProps<Props>>,
    dependencies: Props
): IWidgetNode<E, A> {
    const props: Props = {} as Props;

    Object.entries(dependencies).forEach(([key, value]) =>
        props[key as keyof Props] = (value instanceof StateWidget ? value.value : value) as Props[keyof Props]
    )
    return composite(props as IStatelessProps<Props>);
}
