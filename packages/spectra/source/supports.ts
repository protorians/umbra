import type {
    ISpectra,
    ISpectraAttributes, ISpectraAttributesBlueprint,
    ISpectraBlueprint,
    ISpectraChildren,
    ISpectraClassListBlueprint,
    ISpectraRawChildren, ISpectraStyleBlueprint,
    ISpectraStyleKeys, ISpectraStyleValue,
    ISpectraStyleValues
} from "./types.js";
import {safeString} from "@protorians/core";

export class Spectra implements ISpectra {

    private _blueprint: ISpectraBlueprint = {} as ISpectraBlueprint;
    private _tree: ISpectraRawChildren[] = [];

    constructor(
        private readonly name: string,
    ) {
        this._blueprint.classList = new Set<string>();
        this._blueprint.attributes = new Map<string, string | null | undefined>()
        this._blueprint.style = new Map<ISpectraStyleKeys, ISpectraStyleValue>()
    }

    get tagName(): string {
        return this.name;
    }

    get blueprint(): ISpectraBlueprint {
        return this._blueprint;
    }

    get tree(): ISpectraRawChildren[] {
        return this._tree;
    }

    classname(classname: string | string[]): this {
        (Array.isArray(classname)
            ? classname
            : [...classname.split(' ')])
            .forEach(item => {
                if (!this._blueprint.classList.has(item))
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

    attributes(attributes: ISpectraAttributes): this {
        for (const [key, value] of Object.entries(attributes)) {
            this._blueprint.attributes.set(key, value);
        }
        return this
    }

    text(children: ISpectraChildren): this {
        const isPromise = children instanceof Promise
        if (!isPromise) this._tree.push(children)
        if (isPromise)
            children.then((value: any) => this.text(value));
        return this
    }

    children(children: ISpectraChildren): this {
        this._tree = [];
        this.text(children);
        return this;
    }

    async render(): Promise<string> {
        return spectraRender(this)
    }
}


export async function spectraRender(instance: ISpectra): Promise<string> {
    return new Promise<string>(async (resolve) => {
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
                    value ? `${key}="${safeString(value.toString())}"` : ''
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
        } else if (children instanceof Spectra) {
            sequences.push(await spectraRender(children))
        } else if (typeof children !== 'object') {
            sequences.push(children?.toString() || "")
        }
        resolve(sequences.join(''))
    })
}