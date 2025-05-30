export namespace FunctionUtility {

    export function isAncestor(origin: Function, child: Function) {
        return child.prototype instanceof origin
    }

}