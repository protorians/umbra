export function useStateful(composite, dependencies) {
    let initial = composite(dependencies);
    function update() {
        const computed = composite(dependencies);
        if (computed !== initial) {
            initial.element.replaceWith(computed.clientElement);
            initial = computed;
        }
    }
    Object.entries(dependencies).forEach(([key, state]) => {
        state.effect((current) => {
            dependencies = { ...dependencies, [key]: current };
            update();
        });
    });
    return initial;
}
