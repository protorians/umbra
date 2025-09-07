export interface IPropertiesBag<P> {
    get properties(): P;
    property(name: keyof P): P[keyof P] | undefined;
    setProperty(name: keyof P, value: P[keyof P]): this;
}
export type ILayerComposites<Layer> = {
    [k: string]: Layer;
};
export interface ILayerComposite<Layer> {
    get layer(): Layer;
    layers: ILayerComposites<Layer>;
    initialize(): this;
    createLayer(identifier: string, tagname?: keyof HTMLElementTagNameMap): this;
    removeLayer(identifier: string): this;
    render(): Layer;
    append(child?: ILayerCompositeChild<Layer>): this;
    appendElement(child?: Layer): this;
}
export interface ILayerCompositeChild<Layer> extends ILayerComposite<Layer> {
    parent?: ILayerComposite<Layer>;
    plug(parent: ILayerComposite<Layer>): this;
}
