export type ISetterCallable<Instance, Props> = (props?: Props) => Instance

export type ISetterMethods<Instance, Blueprint> = {
    [K in keyof Blueprint]: ISetterCallable<Instance, Blueprint[K]>
}