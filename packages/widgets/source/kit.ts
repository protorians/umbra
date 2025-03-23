import type {
    ILayout,
    ILayoutCallable,
    IAttributes,
    ICallablePayload,
    IEncapsulatorConfigs,
    IKit, IChildren,
    IKitWidgetCallable
} from "./types/index.js";
import {WidgetException} from "./errors/index.js";


export class Kit<T> implements IKit<T> {

    static _configs: IEncapsulatorConfigs = {
        structures: [],
    }

    static get widget(): IKitWidgetCallable {
        return <E extends HTMLElement, A extends IAttributes>(context?: ICallablePayload<E, A, undefined>): IChildren<any> => {
            if (!this._configs.main)
                throw (new WidgetException('No bootstrapper found')).show()

            const instance = new this();
            const bootstrapper = typeof instance[this._configs.main] === 'function' ? instance[this._configs.main].apply(instance, [context]) : undefined;
            if (!bootstrapper)
                throw (new WidgetException('The bootstrapper is not a function')).show()

            return bootstrapper;
        };
    }

    static begin<T extends IKit<any>>(): T {
        return (new this()) as any
    }

    get rollback(): this {
        return (this.constructor as any).begin()
    }

    get commit(): IKitWidgetCallable {
        return this.push(this)
    }

    protected push(instance?: any): IKitWidgetCallable {
        const _this = this.constructor as typeof Kit<any>;

        return <E extends HTMLElement, A extends IAttributes>(context?: ICallablePayload<E, A, undefined>): IChildren<any> => {
            if (!_this._configs.main)
                throw (new WidgetException('No bootstrapper found')).show()

            instance = instance || this;
            const bootstrapper = typeof instance[_this._configs.main] === 'function' ? instance[_this._configs.main].apply(instance, [context]) : undefined;
            if (!bootstrapper)
                throw (new WidgetException('The bootstrapper is not a function')).show()

            return bootstrapper;
        };
    }

    get structures(): ILayout<T> {
        const _static = this.constructor as typeof Kit<T>;
        const layouts = {} as ILayout<T>;

        _static._configs.structures = _static._configs.structures || [];
        for (const name of _static._configs.structures) {
            const composite = _static[name] || this[name] || undefined;
            if (typeof composite !== 'function') {
                throw (new WidgetException(`Kit.${name} must be a function.`)).show();
            }
            layouts[name] = composite.bind(this);
        }

        return layouts;
    }

    structure<K extends keyof T>(name: K): ILayoutCallable<T[K]> {
        const _static = this.constructor as typeof Kit<T>;
        _static._configs.structures = _static._configs.structures || [];
        if (typeof _static[name as any] !== 'function') {
            throw (new WidgetException(`Kit.${name.toString()} must be a function.`)).show();
        }
        return _static[name as any] as ILayoutCallable<T[K]>
    }
}