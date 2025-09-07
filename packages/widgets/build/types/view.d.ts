import type { IWidgetNode } from "./widget.js";
import type { IRouterBaseRoute, IRouterRoute } from "./router.js";
import type { IState } from "./state.js";
export type IViewMockupScheme = {
    [K in keyof IViewWidgets<any>]: IViewWidgets<any>[K];
};
export type IViewStack = {
    collection: IViewWidgetCollection;
    route: IRouterRoute<any, keyof any> & IRouterBaseRoute;
};
export type IViewWidgetCollection = (IWidgetNode<any, any> | undefined)[];
export type IViewWidgets<Props extends Object> = {
    helmet(): IWidgetNode<any, any> | undefined;
    toolbox(): IWidgetNode<any, any> | undefined;
    navbar(): IWidgetNode<any, any> | undefined;
    body(props?: Props): IWidgetNode<any, any> | undefined;
};
export type IViewMockupView<Props extends Object> = IViewMockupScheme & IViewUsingMethods<Props>;
export type IViewMockup<Props extends Object> = (scheme: IViewMockupView<Props>, props: Props) => IViewWidgetCollection;
export type IViewUsingMethods<Props extends Object> = {
    useProps(props: Props): IView;
};
export type IViewProperties<T> = {
    [K in keyof T]: IState<T[K]>;
};
export type IViewStates<T> = {
    [K in keyof T]: IState<T[K]>;
};
export interface IView {
}
export interface IViewConstructor extends IView {
    new (): IView;
}
