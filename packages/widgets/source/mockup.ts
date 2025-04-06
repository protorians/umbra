import type {
    IEditableClientMockup,
    IMockup,
    IMockupElement,
    IMockupHooks,
    IMockupMeasure,
    IMockupSheet,
    IPrimitive,
    IStyleDeclaration,
    IGlobalAttributes,
    IAttributes,
    IChildren, IMockupContextOptions,
} from "./types/index.js";
import {camelCase, type ITokenList, TokenList, Signal, Environment, stripHTMLTags} from "@protorians/core"
import {InsertionPosition, InsertionSiblingPosition} from "./enums.js";
import {WidgetException} from "./errors/index.js";

/**
 * @deprecated
 */
export namespace Mockup {

    export const Create = <T extends HTMLElement, A extends IAttributes>(
        tag: string,
        children: IChildren<A>,
        attributes: A
    ) => {
        return new Morphic<T, A>(tag, children, attributes)
    }


    export function isEditable<T extends HTMLElement, A extends IAttributes>(
        element: IMockupElement<T, A>
    ): T | null {
        return (Environment.Client
            ? (
                (
                    element instanceof HTMLInputElement ||
                    element instanceof HTMLSelectElement ||
                    element instanceof HTMLTextAreaElement
                ) || (element as HTMLElement).hasAttribute('contenteditable')
            ) ? element : null
            : null) as T;
    }

    export class Sheet<A extends IAttributes> implements IMockupSheet<A> {
        tagName: string = 'div';
        attributes: A = {} as A;
        dataset: IGlobalAttributes = {} as IGlobalAttributes;
        style: IStyleDeclaration = {} as IStyleDeclaration;
        classList: ITokenList<string> = TokenList<string>();
        html: string = '';
        content: string = '';
        value: string = '';
        children: Sheet<any>[] = [];
        innerHTML: string = '';
        textContent: string = '';
        nodesTree: IMockup<any, any>[] = [];


        append(element: IMockupElement<any, any> | undefined): void {
            console.warn(element)
            throw (new WidgetException('"remove" no implemented')).show()
        }

        remove(): void {
            throw (new WidgetException('"remove" no implemented')).show()
        }

        render(): IMockupSheet<A> {
            return this;
        }
    }


    export class Morphic<T extends HTMLElement, A extends IAttributes>
        implements IMockup<T, A> {

        hooks: IMockupHooks<A> = {} as IMockupHooks<A>
        _parent: IMockup<any, any> | undefined

        constructor(
            protected _tag: string,
            protected _children: IChildren<any>,
            readonly defaultAttributes: A,
        ) {
            this._instance = (
                !Environment.Client
                    ? new Sheet<A>()
                    : document.createElement(this._tag)
            ) as IMockupElement<T, A>;
            this.prepare()
        }


        protected _instance: IMockupElement<T, A> | undefined;

        get instance(): IMockupElement<T, A> | undefined {
            return this._instance;
        }

        get parent(): IMockup<any, any> | undefined {
            return this._parent
        }

        set parent(parent: IMockup<any, any>) {
            this._parent = parent;
        }

        get children(): IMockupSheet<any>[] | Element[] {
            return Array.isArray(this._instance?.children)
                ? [...this._instance?.children]
                : (
                    typeof this._instance?.children == 'object'
                        ? [...Object.values(this._instance?.children || {})]
                        : []
                );
        }

        get tagName(): string {
            return this._tag;
        }

        get attributes(): A {
            if (Environment.Client) {
                Object.values(this._instance?.attributes as NamedNodeMap)
                    .forEach(a => this.hooks.attributes.current[a.name] = a.value)
            }
            return this.hooks.attributes.current;
        }

        get dataset(): IGlobalAttributes {
            if (Environment.Client) {
                Object.entries(this._instance?.dataset as DOMStringMap)
                    .forEach(([key, value]) => this.hooks.dataset.current[camelCase(key)] = value)
            }
            return this.hooks.dataset.current;
        }

        get style(): IStyleDeclaration | CSSStyleDeclaration {
            return this.hooks.style.current;
        }

        get className(): ITokenList<string> | DOMTokenList {
            return this.hooks.classList.current;
        }

        get value(): string | null {
            if (Environment.Client) {
                const element = this._instance as HTMLElement;
                const editable = isEditable<IEditableClientMockup, IAttributes>(element as IEditableClientMockup);
                if (editable) {
                    return editable.value
                }
            }
            return null;
        }

        set value(value: IPrimitive) {
            if (Environment.Client) {
                const element = this._instance as HTMLElement;
                const editable = isEditable<IEditableClientMockup, IAttributes>(element as IEditableClientMockup);
                if (editable) {
                    editable.value = JSON.stringify(value);
                }
            } else {
                const text: string = JSON.stringify(value);
                (this._instance as IMockupSheet<A>).value = text;
                this.html = text;
            }
        }

        get html(): string | null {
            return this._instance?.innerHTML || '';
        }

        set html(value: string | null) {
            if (this._instance) {
                value = value || '';
                this._instance.innerHTML = value;
                if (!Environment.Client) this.content = value;
            }
        }

        get content(): string | null {
            return this._instance?.textContent || null;
        }

        set content(data: string | null) {
            if (this._instance) this._instance.textContent = stripHTMLTags(data || '');
        }

        get measure(): IMockupMeasure {
            if (Environment.Client) {
                const shape = (this._instance as HTMLElement).getBoundingClientRect();
                return {
                    x: shape.x,
                    y: shape.y,
                    top: shape.top,
                    bottom: shape.bottom,
                    left: shape.left,
                    right: shape.right,
                    width: shape.width,
                    height: shape.height,
                }
            }
            return {
                x: 0,
                y: 0,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: 0,
                height: 0,
            }
        }

        remove(): this {
            this._instance = undefined;
            return this;
        }

        removeChild(mockup: IMockup<any, any>): this {
            if (!this._instance) {
            } else if (Environment.Client) {
                if (mockup.instance instanceof HTMLElement) (this._instance as HTMLElement).removeChild(mockup.instance)
            } else {
                if (mockup.instance instanceof Sheet) {
                    const nodes = ((this._instance as IMockupSheet<A>).nodesTree)
                    const refactor: IMockup<any, any>[] = []
                    for (let i = 0; i < nodes.length; i++) {
                        const node = nodes[i];
                        if (node.instance !== mockup.instance) refactor.push(node);
                    }
                    (this._instance as IMockupSheet<A>).nodesTree = refactor
                }
            }

            return this;
        }

        insert(
            mockup: IMockup<any, any>,
            position: InsertionPosition | InsertionSiblingPosition,
            child?: IMockup<any, any>
        ): this {
            if (!this._instance) {
            } else if (Environment.Client) {
                const e = (this._instance as HTMLElement);

                switch (position) {
                    case InsertionPosition.AfterBegin:
                    case InsertionPosition.AfterEnd:
                    case InsertionPosition.BeforeEnd:
                    case InsertionPosition.BeforeBegin:
                        e.insertAdjacentElement(position.toString().toLowerCase() as InsertPosition, mockup.instance as HTMLElement)
                        break

                    case InsertionSiblingPosition.Before:
                        e.insertBefore(mockup.instance as HTMLElement, child?.instance as HTMLElement)
                        break;

                    case InsertionSiblingPosition.After:
                        e.insertBefore(mockup.instance as HTMLElement, ((child?.instance as HTMLElement).nextElementSibling as HTMLElement) || child?.instance as HTMLElement)
                        break;
                }

            } else {
                const e = (this._instance as IMockupSheet<A>);

                switch (position) {
                    case InsertionPosition.BeforeBegin:
                        mockup.parent = this;
                        this._parent?.insert(mockup, InsertionSiblingPosition.Before, this)
                        break;

                    case InsertionPosition.AfterBegin:
                        this.prepend(mockup)
                        break;

                    case InsertionPosition.BeforeEnd:
                        this.append(mockup)
                        break;

                    case InsertionPosition.AfterEnd:
                        mockup.parent = this;
                        this._parent?.insert(mockup, InsertionSiblingPosition.After, this)
                        break;

                    case InsertionSiblingPosition.Before:
                        const treeBefore: IMockup<any, any>[] = []

                        e.nodesTree.forEach(n => {
                            n.parent = this;
                            if (n === child?.instance) treeBefore[treeBefore.length] = mockup;
                            treeBefore[treeBefore.length] = n
                        })

                        e.nodesTree = treeBefore;
                        break;

                    case InsertionSiblingPosition.After:
                        const treeAfter: IMockup<any, any>[] = []

                        e.nodesTree.forEach(n => {
                            n.parent = this;
                            treeAfter[treeAfter.length] = n
                            if (n === child?.instance) treeAfter[treeAfter.length] = mockup;
                        })

                        e.nodesTree = treeAfter
                        break;
                }


            }
            return this;
        }

        prepend(mockup: IMockup<any, any>): this {
            if (!this._instance) {
            } else if (Environment.Client) {
                if (mockup.instance instanceof HTMLElement) (this._instance as HTMLElement).prepend(mockup.instance)
            } else {
                if (mockup.instance instanceof Sheet) {
                    mockup.parent = this;
                    (this._instance as IMockupSheet<A>).nodesTree.unshift(mockup)
                }
            }
            return this;
        }

        append(mockup: IMockupElement<any, any> | string): this {
            if (Environment.Client) {
                (this._instance as HTMLElement).append(mockup)
            } else {
                if (mockup.instance instanceof Sheet) {
                    if (typeof mockup == 'object') mockup.parent = this;
                    (this._instance as IMockupSheet<A>).nodesTree.push(mockup);
                }
            }
            return this;
        }

        prepare(): this {

            if (this._instance) {

                this.hooks = {
                    attributes: new Signal.Controller(this._instance.attributes as A),
                    dataset: new Signal.Controller(this._instance.dataset),
                    style: new Signal.Controller(this._instance.style),
                    classList: new Signal.Controller(this._instance.classList),
                }

                this.hooks.attributes.effect(({name, value}) => {
                    if (Environment.Client) {
                        if (![
                            "classname",
                            "data",
                            "dataset",
                        ].includes(name.toString().toLowerCase())
                        ) {

                            (!value
                                    ? (this._instance as HTMLElement).removeAttribute(name.toString())
                                    : (this._instance as HTMLElement).setAttribute(name.toString(), value)
                            )
                        }
                    }
                    return true;
                })

                this.hooks.dataset.effect(({name, value}) => {
                    if (Environment.Client) {
                        (this._instance as HTMLElement).dataset[camelCase(name.toString())] = value;
                    }
                    return true;
                })

                // if(this._children){
                //   console.warn(this._children)
                // }
            }

            return this;
        }

        render(): IMockupSheet<A> | HTMLElement | null {
            if (Environment.Client) return (this._instance as HTMLElement)
            else return (this._instance as IMockupSheet<A>).render()
        }
    }


    export function Context<T, E extends HTMLElement, A extends IAttributes>(
        element: IMockupElement<E, A>,
        options: IMockupContextOptions<T, E, A>
    ): T {
        if (options.any) return options.any(element)
        else if (options.client || options.server) {
            if (options.client && Environment.Client && element instanceof HTMLElement) return options.client(element)
            if (options.server && !Environment.Client && element instanceof Sheet) return options.server(element)
            throw (new WidgetException(`This element is not supported by the "${Environment.GetChannel()}" context`)).show()
        }
        throw (new WidgetException('No context to execute')).show()
    }

}