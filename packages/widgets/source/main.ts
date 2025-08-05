import {StyleWidget} from "./style.js";
import {WidgetDirectives, WidgetDirectivesType} from "./directive.js";
import {StateWidget, StateWidgetWatcher} from "./hooks/index.js";
import {IWidgetDirectiveContent} from "./types/directive.js";
import {Environment} from "@protorians/core";

StyleWidget.alias
    .set('paddingX', ['paddingLeft', 'paddingRight'])
    .set('paddingY', ['paddingTop', 'paddingBottom'])
    .set('marginX', ['marginLeft', 'marginRight'])
    .set('marginY', ['marginTop', 'marginBottom']);


WidgetDirectives
    .add('widget:state', ({value: children, type, args}) => {
        const {widget} = args as IWidgetDirectiveContent<any, any>;
        if (type === WidgetDirectivesType.EngineContent) {
            if (children && children instanceof StateWidget)
                children.bind(widget)
            else if (children instanceof StateWidgetWatcher)
                children.bind(widget)
        }
    })
    .add('widget:html.element', ({value: children, type, args}) => {
        const {widget} = args as IWidgetDirectiveContent<any, any>;
        if (type === WidgetDirectivesType.EngineContent) {
            if (
                Environment.Client &&
                (children instanceof HTMLElement ||
                    children instanceof DocumentFragment ||
                    children instanceof Text)
            ) {
                widget.clientElement?.append(children);
            }
        }
    })
    .add('widget:function', ({value: children, type, args}) => {
        const {widget, engine} = args as IWidgetDirectiveContent<any, any>;

        if (type === WidgetDirectivesType.EngineContent) {
            if (typeof children === 'function') {
                const rendered = children({
                    root: engine.widget,
                    widget: widget,
                    payload: undefined,
                })
                engine.content(widget, rendered)
            }
        }
    })
    .add('widget:promise', ({value: children, type, args}) => {
        const {widget, engine} = args as IWidgetDirectiveContent<any, any>;
        if (type === WidgetDirectivesType.EngineContent) {
            if (children instanceof Promise)
                children.then(child => engine.content(widget, child));
        }
    })
