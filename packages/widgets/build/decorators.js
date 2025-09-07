import { ViewWidget } from "./view.js";
import { extractComponentName } from "./helpers/index.js";
import { View, Widget } from "./collections.js";
import { WidgetException } from "./errors/index.js";
import { WidgetNode } from "./widget-node.js";
import { Mount } from "./component.js";
import { TextUtility } from "@protorians/core";
const Make = {
    composable: {
        view: {
            initialize(target, collection, collectionKey) {
                const identifier = extractComponentName(target.name, collectionKey);
                const id = TextUtility.ucFirstLetter(identifier);
                collection = (collection || View);
                if (collection[id])
                    throw (new WidgetException(`This composable < ${id} > has already been defined`)).show();
                collection[id] = (props) => this.definition(target, props);
            },
            definition: (target, props) => {
                const view = target;
                const widget = view.construct(props);
                return widget || undefined;
            },
        },
        widget: {
            initialize(target, collection, collectionKey) {
                const identifier = extractComponentName(target.name, collectionKey);
                const id = `${identifier[0].toUpperCase()}${identifier.substring(1)}`;
                collection = (collection || Widget);
                if (collection[id])
                    throw (new WidgetException(`This composable < ${id} > has already been defined`)).show();
                collection[id] = (attributes) => this.definition(target, attributes);
            },
            definition(target, store) {
                return (new target(store));
            }
        }
    },
    configs(target) {
        const _static = target.constructor;
        const id = _static.name || _static.constructor.name;
        const stack = (target._configs || _static._configs);
        const configs = stack.get(id) || structuredClone(_static._default_configs || { structures: [] });
        return {
            configs,
            id,
            stack,
            static: _static,
        };
    }
};
export function Composable(collection, collectionKey) {
    return function (target) {
        if (target.prototype instanceof ViewWidget) {
            Make.composable.view.initialize(target, collection, collectionKey);
        }
        else if (target.prototype instanceof WidgetNode) {
            Make.composable.widget.initialize(target, collection, collectionKey);
        }
        else
            throw (new WidgetException(`< ${target.name} > is not a composable`)).show();
    };
}
export function Mountable() {
    return function (target) {
        const name = extractComponentName(target.name);
        if (target.prototype instanceof ViewWidget) {
            Mount(`View${TextUtility.ucFirstLetter(name)}`, (props) => Make.composable.view.definition(target, props) || (new WidgetNode({ children: '' })));
        }
        else if (target.prototype instanceof WidgetNode) {
            Mount(`Widget${TextUtility.ucFirstLetter(name)}`, (store) => Make.composable.widget.definition(target, store));
        }
    };
}
export function Structurable(target, name) {
    const make = Make.configs(target);
    make.configs.structures?.push(name);
    make.stack.set(make.id, { ...make.configs });
}
export function Property() {
    return function (target, name) {
        const make = Make.configs(target);
        make.configs.properties = make.configs.properties || [];
        make.configs.properties.push(name);
        make.stack.set(make.id, { ...make.configs });
    };
}
export function State() {
    return function (target, name) {
        const make = Make.configs(target);
        make.configs.states = make.configs.states || [];
        make.configs.states.push(name);
        make.stack.set(make.id, { ...make.configs });
    };
}
export function Optionator(options) {
    return function (target) {
        const make = Make.configs(target);
        make.configs.options = options;
        make.stack.set(make.id, { ...make.configs });
    };
}
export function Override() {
    return function (target, name) {
        const make = Make.configs(target);
        make.configs.main = name;
        make.stack.set(make.id, { ...make.configs });
    };
}
export function Bootstrapper() {
    return function (target, name) {
        const make = Make.configs(target);
        make.configs.bootstrapper = name;
        make.stack.set(make.id, { ...make.configs });
    };
}
export function Defuser() {
    return function (target, name) {
        const make = Make.configs(target);
        make.configs.defuser = name;
        make.stack.set(make.id, { ...make.configs });
    };
}
