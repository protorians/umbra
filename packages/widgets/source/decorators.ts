import {
    IComponentPayload,
    IViewCollection,
    IEncapsulatorOptions,
    IWidgetCollection,
    IWidgetNode, IEncapsulator,
    IEncapsulatorConfigs,
} from "./types/index.js";
import {ViewWidget} from "./view.js";
import {extractComponentName} from "./helpers/index.js";
import {View, Widget} from "./collections.js";
import {WidgetException} from "./errors/index.js";
import {WidgetNode} from "./widget-node.js";
import {Mount} from "./component.js";
import {ucFirstLetter} from "@protorians/core";

const Make = {
    composable: {
        view: {
            initialize(target: any, collection?: IWidgetCollection | IViewCollection, collectionKey?: string) {
                const identifier = extractComponentName(target.name, collectionKey)
                const id = ucFirstLetter(identifier);
                collection = (collection || View) as IWidgetCollection;
                if (collection[id]) throw (new WidgetException(`This composable < ${id} > has already been defined`)).show()
                collection[id] = (props: any) => this.definition<any>(target, props)

            },
            definition: <S extends IComponentPayload<any, any>>(target: any, props: S['props']) => {
                const view = target as IEncapsulator;
                const widget = view.construct(props);
                return widget || undefined
            },
        },
        widget: {
            initialize(target: any, collection?: IWidgetCollection | IViewCollection, collectionKey?: string) {
                const identifier = extractComponentName(target.name, collectionKey)
                const id = `${identifier[0].toUpperCase()}${identifier.substring(1)}`;
                collection = (collection || Widget) as IWidgetCollection;
                if (collection[id]) throw (new WidgetException(`This composable < ${id} > has already been defined`)).show()
                collection[id] = (attributes: any) => this.definition(target, attributes);
            },
            definition(target: any, store: any) {
                return (new target(store)) as IWidgetNode<any, any>;
            }
        }
    }
}

/**
 * Widget integrator decorator
 * @description Enables a widget to be composed
 */
export function Composable(
    collection?: IWidgetCollection | IViewCollection,
    collectionKey?: string
) {
    return function (target: any) {
        if (target.prototype instanceof ViewWidget) {
            Make.composable.view.initialize(target, collection, collectionKey);
        } else if (target.prototype instanceof WidgetNode) {
            Make.composable.widget.initialize(target, collection, collectionKey);
        } else throw (new WidgetException(`< ${target.name} > is not a composable`)).show()

    }
}

/**
 * Widget integrator decorator
 * @description Allows a widget to be mounted
 */
export function Mountable() {
    return function (target: any) {
        const name = extractComponentName(target.name)
        if (target.prototype instanceof ViewWidget) {
            Mount(`View${ucFirstLetter(name)}`, (props) =>
                Make.composable.view.definition(target, props) || (new WidgetNode({children: ''}))
            );
        } else if (target.prototype instanceof WidgetNode) {
            Mount(`Widget${ucFirstLetter(name)}`, (store) =>
                Make.composable.widget.definition(target, store)
            )
        }
    }
}


// export function Viewable(config?: Omit<IWidgetIntegratorConfigs, 'stateless'>) {
//     return function (target: any) {
//         target.constructor._configs = {
//             stateless: target.constructor._configs.stateless,
//             main: undefined,
//             bootstrapper: undefined,
//             defuser: undefined,
//             options: {},
//             ...(config || {}),
//         };
//     }
// }

/**
 * Widget integrator decorator
 * @description Enable a widget integrator property to host layout structure
 */
export function Structurable(target: any, name: string) {
    const configs = (target._configs || target.constructor._configs) as IEncapsulatorConfigs | undefined;

    if (configs) {
        if (!Array.isArray(configs?.structures)) configs.structures = [];
        configs?.structures.push(name);
    }
}


/**
 * Widget integrator decorator
 * @description Enable a widget integrator property to host properties
 */
export function Property() {
    return function (target: any, name: string) {
        target.constructor._configs = {...(target.constructor._configs || {})} as IEncapsulatorConfigs;
        target.constructor._configs.propertiees = target.constructor._configs.propertiees || [];
        target.constructor._configs.propertiees.push(name);
    }
}

/**
 * Widget integrator decorator
 * @description Enable a widget integrator property to host states
 */
export function State() {
    return function (target: any, name: string) {
        target.constructor._configs = {...(target.constructor._configs || {})} as IEncapsulatorConfigs;
        target.constructor._configs.states = target.constructor._configs.states || [];
        target.constructor._configs.states.push(name);
    }
}

/**
 * Widget integrator decorator
 * @description Widget integrator options configurator
 */
export function Optionator(options: IEncapsulatorOptions) {
    return function (target: any) {
        target.constructor._configs = {...(target.constructor._configs || {})} as IEncapsulatorConfigs;
        target.constructor._configs.options = options;
    }
}

/**
 * Widget integrator decorator
 * @description Allows you to define the name of the method representing the integrator widget
 */
export function Override() {
    return function (target: any, name: string) {
        target.constructor._configs = {...(target.constructor._configs || {})} as IEncapsulatorConfigs;
        target.constructor._configs.main = name;
    }
}

/**
 * Widget integrator decorator
 * @description The priming method.
 */
export function Bootstrapper() {
    return function (target: any, name: string) {
        target.constructor._configs = {...(target.constructor._configs || {})} as IEncapsulatorConfigs;
        target.constructor._configs.bootstrapper = name;
    }
}

/**
 * Widget integrator decorator
 * @description The defusing method.
 */
export function Defuser() {
    return function (target: any, name: string) {
        target.constructor._configs = {...(target.constructor._configs || {})} as IEncapsulatorConfigs;
        target.constructor._configs.defuser = name;
    }
}
