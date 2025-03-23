import type {
    IView,
    IEncapsulatorConfigs, IWidgetNode,
    ICallablePayload, IAttributes,
    IViewStates,
    IViewProperties,
} from "./types/index.js";
import {WidgetException} from "./errors/index.js";
import {StateWidget} from "./hooks/index.js";


export class Views {
    // static stacked: IViewStack | undefined;
    // static useMockup: IViewMockup<any> | undefined

    // static mockup<Props extends Object>(view: IViewMockupView<Props>, props: Props): IViewWidgetCollection {
    //     return [
    //         view.helmet(),
    //         view.body(props),
    //         view.navbar(),
    //         view.toolbox(),
    //     ]
    // };
    //
    // static render<Props extends Object>(
    //     view: IView,
    //     props: Props,
    //     mockup?: IViewMockup<Props>,
    // ): IViewWidgetCollection {
    //     view.useProps(props)
    //     return (mockup || this.mockup)(view, props)
    // }

}

export class ViewWidget implements IView {

    protected static _instance: IView | undefined;
    protected static _widget: IWidgetNode<any, any> | undefined;

    static _configs: IEncapsulatorConfigs = {
        stateless: true,
        main: undefined,
        bootstrapper: undefined,
        defuser: undefined,
        properties: [],
        states: [],
        options: {},
    }

    static props: Readonly<IViewProperties<any>> = {}

    static states: Readonly<IViewStates<any>> = {}

    static get instance(): IView | undefined {
        return this._instance
    }

    static get widget(): IWidgetNode<any, any> | undefined {
        return this._widget
    }

    static subscribe(value: ViewWidget): typeof this {
        this._instance = value;
        return this;
    }

    static bootstrap<E extends HTMLElement, A extends IAttributes>(payload: ICallablePayload<E, A, IWidgetNode<E, A>>): void {
        if (typeof this._configs !== 'object') return;
        if (typeof this._configs.bootstrapper === 'undefined') return;
        if (this._instance && typeof this._instance[this._configs.bootstrapper] !== 'function') return;
        if (this._instance) this._instance[this._configs.bootstrapper].apply(this._instance, [payload]);
    }

    static defuse<E extends HTMLElement, A extends IAttributes>(payload: ICallablePayload<E, A, undefined>): void {
        if (typeof this._configs !== 'object') return;
        if (typeof this._configs.defuser === 'undefined') return;
        if (this._instance && typeof this._instance[this._configs.defuser] !== 'function') return;
        if (this._instance) this._instance[this._configs.defuser].apply(this._instance, [payload]);
    }

    static construct<T extends Object>(props?: T): IWidgetNode<any, any> | undefined {
        if (!this._configs.main)
            throw (new WidgetException('Not View Main implemented')).show();

        let instance: IView | undefined = (
            !this._configs.stateless
                ? (this._instance || new this())
                : new this()
        );

        if (typeof instance[this._configs.main] !== 'function')
            throw (new WidgetException(`${this._configs.main} is not a function`)).show();

        if (this._configs.properties) {
            this._configs.properties.forEach(name => {
                if (!instance) return;
                if (typeof instance[name] === 'function') return;
                Object.defineProperty(this.props, name, {
                    writable: false,
                    value: instance[name],
                })
            })
        }

        if (this._configs.states && !this._configs.stateless) {
            this._configs.states.forEach(name => {
                if (!instance) return;
                if (typeof instance[name] === 'undefined') return;
                if (!(instance[name] instanceof StateWidget)) return;
                Object.defineProperty(this.states, name, {
                    writable: false,
                    value: instance[name],
                })
            })
        }

        this._widget = instance[this._configs.main].apply(instance, [props || {} as T]) as IWidgetNode<any, any> | undefined

        this._widget?.attributeLess({ariaCurrent: "page"})

        // this._widget = (this._configs.stateless || !this._widget)
        //     ? instance[this._configs.main].apply(instance, [props || {} as T]) as IWidgetNode<any, any> | undefined
        //     : this._widget;

        this._widget?.signal.listen('mount', this.bootstrap.bind(instance))

        this._widget?.signal.listen('unmount', (payload) => {
            this.defuse.apply(instance, [payload]);
            if (this._configs.stateless) {
                this._widget?.clear();
                instance = undefined;
            }
        })

        return this._widget
    }

    constructor() {
        (this.constructor as typeof ViewWidget).subscribe(this);
    }

}


export class StatefulView extends ViewWidget {

    static _configs: IEncapsulatorConfigs = {
        stateless: false,
        main: undefined,
        bootstrapper: undefined,
        defuser: undefined,
        properties: [],
        states: [],
        options: {},
    }

}


export class StatelessView extends ViewWidget {

    static _configs: IEncapsulatorConfigs = {
        stateless: true,
        main: undefined,
        bootstrapper: undefined,
        defuser: undefined,
        properties: [],
        states: [],
        options: {},
    }

}