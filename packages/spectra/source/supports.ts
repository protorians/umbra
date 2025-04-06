import type {
    ISpectraElement,
    ISpectraAttributes, ISpectraAttributesBlueprint,
    ISpectraBlueprint,
    ISpectraChildren,
    ISpectraClassListBlueprint,
    ISpectraRawChildren, ISpectraStyleBlueprint,
    ISpectraStyleKeys, ISpectraStyleValue,
    ISpectraStyleValues
} from "./types.js";
import {camelCase, safeString, unCamelCase} from "@protorians/core";


export class SpectraElement implements ISpectraElement {

    private _blueprint: ISpectraBlueprint = {} as ISpectraBlueprint;
    private _tree: ISpectraRawChildren[] = [];
    private _removed: boolean = true;

    constructor(
        public readonly tagName: string,
    ) {
        this._blueprint.classList = new Set<string>();
        this._blueprint.attributes = new Map<string, string | null | undefined>()
        this._blueprint.style = new Map<ISpectraStyleKeys, ISpectraStyleValue>()
    }

    get blueprint(): ISpectraBlueprint {
        return this._blueprint;
    }

    get tree(): ISpectraRawChildren[] {
        return this._tree;
    }

    get removed(): boolean {
        return this._removed;
    }

    get attributes(): ISpectraAttributes {
        const attribs = {}
        for (let [key, value] of this._blueprint.attributes.entries()) {
            if (!key.startsWith('data-')) attribs[unCamelCase(key)] = value;
        }
        return attribs;
    }

    get dataset(): ISpectraAttributes {
        const dataset = {}
        for (let [key, value] of this._blueprint.attributes.entries()) {
            if (key.startsWith('data-'))
                dataset[unCamelCase(key).substring('data-'.length)] = value;
        }
        return dataset;
    }

    get textContent(): string {
        return this._tree
            .map(child => child instanceof SpectraElement ? child.render() : child)
            .filter(child => typeof child == 'string')
            .join('')
    }

    set textContent(children: string | null | undefined ) {
        this.append(children)
    }

    get value(): string {
        return this.textContent;
    }

    set value(children: string | null | undefined ) {
        this.children(children)
    }

    children(children: ISpectraChildren): this {
        this._tree = [];
        this.append(children);
        return this;
    }

    classname(classname: string | string[]): this {
        (Array.isArray(classname)
            ? classname
            : [...classname.split(' ')])
            .forEach(item => {
                item = item.trim();
                if (item.length && !this._blueprint.classList.has(item))
                    this._blueprint.classList.add(item)
            });
        return this;
    }

    style(styles: ISpectraStyleValues): this {
        for (const [key, value] of Object.entries(styles)) {
            if (typeof value == 'object') {
                this.style(value)
            } else if (value) this._blueprint.style.set(key as ISpectraStyleKeys, value);
        }
        return this;
    }

    attribute(attributes: ISpectraAttributes): this {
        for (const [key, value] of Object.entries(attributes)) {
            if (!key.startsWith('data-')) {
                if (typeof value !== 'undefined') this._blueprint.attributes.set(key, value?.toString());
                else this._blueprint.attributes.delete(key);
            }
        }
        return this
    }

    data(dataset: ISpectraAttributes): this {
        for (let [key, value] of Object.entries(dataset)) {
            key = `data-${camelCase(key)}`
            if (typeof value !== 'undefined') this._blueprint.attributes.set(key, value?.toString());
            else this._blueprint.attributes.delete(key);
        }
        return this
    }

    prepend(children: ISpectraChildren): this {
        const isPromise = children instanceof Promise
        if (!isPromise) this._tree.unshift(children)
        if (isPromise)
            children.then((value: any) => this.prepend(value));
        return this
    }

    append(children: ISpectraChildren): this {
        const isPromise = children instanceof Promise
        if (!isPromise) this._tree.push(children)
        if (isPromise)
            children.then((value: any) => this.append(value));
        return this
    }

    appendChild(child: ISpectraElement): this {
        this._tree.push(child)
        return this
    }

    remove(): void {
        this._removed = false;
    }

    async render(): Promise<string> {
        return spectraRender(this)
    }
}


export async function spectraRender(instance: ISpectraElement): Promise<string> {
    return new Promise<string>(async (resolve) => {

        if (!instance.removed) {
            resolve('')
            return;
        }

        const sequences: string[] = [];
        const attributes = await spectraAttributesRender(instance.blueprint.attributes);
        const classname = await spectraClassnameRender(instance.blueprint.classList)
        const style = await spectraStyleRender(instance.blueprint.style)

        sequences.push(`<${instance.tagName}`);
        sequences.push(`${style.length ? ` style="${((style.toString()))}" ` : ``}`);
        sequences.push(`${classname.length ? ` class="${((classname.toString()))}" ` : ``}`);
        sequences.push(`${attributes.length ? ` ${attributes.toString()} ` : ``}`);
        sequences.push(`>`);

        sequences.push(await spectraTreeRender(instance.tree));
        sequences.push(`</${instance.tagName}>`);

        resolve(sequences.join(''));
    })
}

export async function spectraAttributesRender(attributes: ISpectraAttributesBlueprint): Promise<string> {
    return new Promise<string>(async (resolve) => {
        resolve(
            [...attributes.entries()].map(
                ([key, value]) =>
                    value ? `${unCamelCase(key)}="${safeString(value.toString())}"` : ''
            ).join(" ")
        );
    })
}

export async function spectraStyleRender(attributes: ISpectraStyleBlueprint): Promise<string> {
    return new Promise<string>(async (resolve) => {
        resolve(
            [...attributes.entries()].map(
                ([key, value]) =>
                    value ? `${key}:${safeString(value.toString())}` : ''
            ).join("; ")
        );
    })
}

export async function spectraClassnameRender(classList: ISpectraClassListBlueprint): Promise<string> {
    return new Promise<string>(async (resolve) => {
        resolve(
            [...classList.values()].map(safeString).join(" ")
        );
    })
}

export async function spectraTreeRender(tree: ISpectraRawChildren[]): Promise<string> {
    return new Promise<string>(async (resolve) => {
        const sequences: string[] = [];

        for (const child of tree) {
            sequences.push(await spectraChildrenRender(child))
        }

        resolve(sequences.join(""));
    })
}

export async function spectraChildrenRender(children: ISpectraChildren): Promise<string> {
    return new Promise<string>(async (resolve) => {
        const sequences: string[] = [];
        if (children instanceof Promise) {
            sequences.push(
                await spectraChildrenRender(
                    await children.then((child: any) => child)
                )
            )
        } else if (Array.isArray(children)) {
            for (const child of children)
                sequences.push(await spectraChildrenRender(child))
        } else if (children instanceof SpectraElement) {
            sequences.push(await spectraRender(children))
        } else if (typeof children !== 'object') {
            sequences.push(children?.toString() || "")
        }
        resolve(sequences.join(''))
    })
}