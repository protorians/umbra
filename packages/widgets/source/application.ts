import type {IApplication, IApplicationConfig, IRouterBaseScheme, IWidgetNode} from "./types/index.js";
import {Mount} from "./component.js";
import {Image, Layer, Section, SmallerText, Text,} from "./overlay/index.js";
import {WidgetBuilder} from "./widget-node.js";


export class ApplicationStyle {
    static main = {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    }

    static content = {
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        width: '100%',
        height: '100%',
    }
}


export class Applications {
    protected static _entries = {}
}

export class Application<RouterScheme extends IRouterBaseScheme> implements IApplication<RouterScheme> {
    protected main: IWidgetNode<any, any>;

    constructor(
        public readonly config: IApplicationConfig<RouterScheme>
    ) {
        this.main = Section({
            style: ApplicationStyle.main,
            children: Layer({
                style: ApplicationStyle.content,
                children: [

                    this.config.icon
                        ? Image({
                            src: `${this.config.icon}`
                        })
                        : undefined,

                    this.config.name
                        ? Text({
                            children: `${this.config.name}`
                        })
                        : undefined,

                    this.config.title
                        ? SmallerText({
                            children: `${this.config.title}`
                        })
                        : undefined,

                ]
            })
        })
    }

    run() {

        Mount(this.config.alias, () => this.main)

        this.config.router
            .signal
            .listen('navigate', ({route, params}) => {
                document.title = `${this.config.title || document.title}`;
                const widget = route.view.construct(params);

                if (
                    widget &&
                    this.main.context &&
                    this.main.context.root &&
                    this.main.element instanceof HTMLElement &&
                    widget.element instanceof HTMLElement
                ) {
                    this.main.clear();

                    this.main.signal.dispatch('unmount', {
                        root: this.main.context.root,
                        widget: this.main.context.widget,
                        payload: undefined
                    }, widget)

                    const context = this.main.context;
                    context.root = widget;
                    WidgetBuilder(widget, this.main.context)

                    this.main.element.replaceWith(widget.element);

                    requestAnimationFrame(() => {
                        widget.signal
                            .dispatch('mount', {
                                root: this.main,
                                widget: widget,
                                payload: widget
                            }, widget);
                    })

                    this.main = widget;
                }
            })

        this.config.router.run()
        return this;
    }

}

export function createApplication<RouterScheme extends IRouterBaseScheme>(
    config: IApplicationConfig<RouterScheme>
) {
    return (new Application<RouterScheme>(config))
}