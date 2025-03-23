import type {IWidgetDeclaration, IWidgetDeclarationExploded} from "../types/index.js";

export function declarationExplodes<D extends IWidgetDeclaration<any, any>, T>(
    props: D,
    targetKeys: (keyof T)[]
): IWidgetDeclarationExploded<D, T> {
    const extended: T = {} as T
    const declaration: D = {} as D

    Object.entries(props as Object)
        .forEach(([key, value]) => {
            if (targetKeys.includes(key as any)) {
                extended[key] = value
            } else {
                declaration[key] = value;
            }
        })

    return {extended, declaration}
}


// export function declarationExcavates<E extends HTMLElement, A extends IAttributes, T>(
//   props: IWidgetDeclaration<E, A & T>,
//   targetKeys: (keyof IWidgetDeclaration<E, A & T>)[]
// ) {
//
//   const excavate: T = {} as T
//   const current: IWidgetDeclaration<E, A> = {} as IWidgetDeclaration<E, A>
//
//   Object.entries(props)
//     .forEach(([key, value]) => {
//       if (targetKeys.includes(key as keyof IWidgetDeclaration<E, A>)) {
//         excavate[key] = value
//       } else {
//         current[key] = value;
//       }
//     })
//
//   return {excavate, current}
// }