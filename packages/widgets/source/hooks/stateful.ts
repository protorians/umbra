import type {IAttributes, IComposite, IState, IWidgetNode} from "../types/index.js";

export function useStateful<Props extends Record<string, IState<any>>, E extends HTMLElement, A extends IAttributes>(
    composite: IComposite<Props>,
    dependencies: Props
): IWidgetNode<E, A> {

    let initial = composite(dependencies)

    function update() {
        const computed = composite(dependencies);
        if (computed !== initial) {
            initial.element.replaceWith(computed.clientElement)
            initial = computed;
        }
    }

    Object.entries(dependencies).forEach(([key, state]) => {
        state.effect((current) => {
            dependencies = {...dependencies, [key]: current};
            update();
        })
    })

    return initial;
}
