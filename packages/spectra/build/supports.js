import { HtmlUtility, TextUtility } from "@protorians/core";
export class SpectraElement {
    tagName;
    _blueprint = {};
    _tree = [];
    _removed = true;
    constructor(tagName) {
        this.tagName = tagName;
        this._blueprint.classList = new Set();
        this._blueprint.attributes = new Map();
        this._blueprint.style = new Map();
    }
    get blueprint() {
        return this._blueprint;
    }
    get tree() {
        return this._tree;
    }
    get removed() {
        return this._removed;
    }
    get attributes() {
        const attribs = {};
        for (let [key, value] of this._blueprint.attributes.entries()) {
            if (!key.startsWith('data-'))
                attribs[TextUtility.unCamelCase(key)] = value;
        }
        return attribs;
    }
    get dataset() {
        const dataset = {};
        for (let [key, value] of this._blueprint.attributes.entries()) {
            if (key.startsWith('data-'))
                dataset[TextUtility.unCamelCase(key).substring('data-'.length)] = value;
        }
        return dataset;
    }
    get textContent() {
        return this._tree
            .map(child => child instanceof SpectraElement ? child.render() : child)
            .filter(child => typeof child == 'string')
            .join('');
    }
    set textContent(children) {
        this.append(children);
    }
    get value() {
        return this.textContent;
    }
    set value(children) {
        this.children(children);
    }
    children(children) {
        this._tree = [];
        this.append(children);
        return this;
    }
    classname(classname) {
        (Array.isArray(classname)
            ? classname
            : [...classname.split(' ')])
            .forEach(item => {
            item = item.trim();
            if (item.length && !this._blueprint.classList.has(item))
                this._blueprint.classList.add(item);
        });
        return this;
    }
    style(styles) {
        for (const [key, value] of Object.entries(styles)) {
            if (typeof value == 'object') {
                this.style(value);
            }
            else if (value)
                this._blueprint.style.set(key, value);
        }
        return this;
    }
    attribute(attributes) {
        for (const [key, value] of Object.entries(attributes)) {
            if (!key.startsWith('data-')) {
                if (typeof value !== 'undefined')
                    this._blueprint.attributes.set(key, value?.toString());
                else
                    this._blueprint.attributes.delete(key);
            }
        }
        return this;
    }
    data(dataset) {
        for (let [key, value] of Object.entries(dataset)) {
            key = `data-${TextUtility.camelCase(key)}`;
            if (typeof value !== 'undefined')
                this._blueprint.attributes.set(key, value?.toString());
            else
                this._blueprint.attributes.delete(key);
        }
        return this;
    }
    prepend(children) {
        const isPromise = children instanceof Promise;
        if (!isPromise)
            this._tree.unshift(children);
        if (isPromise)
            children.then((value) => this.prepend(value));
        return this;
    }
    append(children) {
        const isPromise = children instanceof Promise;
        if (!isPromise)
            this._tree.push(children);
        if (isPromise)
            children.then((value) => this.append(value));
        return this;
    }
    appendChild(child) {
        this._tree.push(child);
        return this;
    }
    remove() {
        this._removed = false;
    }
    async render() {
        return spectraRender(this);
    }
}
export async function spectraRender(instance) {
    return new Promise(async (resolve) => {
        if (!instance.removed) {
            resolve('');
            return;
        }
        const sequences = [];
        const attributes = await spectraAttributesRender(instance.blueprint.attributes);
        const classname = await spectraClassnameRender(instance.blueprint.classList);
        const style = await spectraStyleRender(instance.blueprint.style);
        sequences.push(`<${instance.tagName}`);
        sequences.push(`${style.length ? ` style="${((style.toString()))}" ` : ``}`);
        sequences.push(`${classname.length ? ` class="${((classname.toString()))}" ` : ``}`);
        sequences.push(`${attributes.length ? ` ${attributes.toString()} ` : ``}`);
        sequences.push(`>`);
        sequences.push(await spectraTreeRender(instance.tree));
        sequences.push(`</${instance.tagName}>`);
        resolve(sequences.join(''));
    });
}
export async function spectraAttributesRender(attributes) {
    return new Promise(async (resolve) => {
        resolve([...attributes.entries()].map(([key, value]) => value ? `${TextUtility.unCamelCase(key)}="${HtmlUtility.escape(value.toString())}"` : '').join(" "));
    });
}
export async function spectraStyleRender(attributes) {
    return new Promise(async (resolve) => {
        resolve([...attributes.entries()].map(([key, value]) => value ? `${key}:${HtmlUtility.escape(value.toString())}` : '').join("; "));
    });
}
export async function spectraClassnameRender(classList) {
    return new Promise(async (resolve) => {
        resolve([...classList.values()].map(HtmlUtility.escape).join(" "));
    });
}
export async function spectraTreeRender(tree) {
    return new Promise(async (resolve) => {
        const sequences = [];
        for (const child of tree) {
            sequences.push(await spectraChildrenRender(child));
        }
        resolve(sequences.join(""));
    });
}
export async function spectraChildrenRender(children) {
    return new Promise(async (resolve) => {
        const sequences = [];
        if (children instanceof Promise) {
            sequences.push(await spectraChildrenRender(await children.then((child) => child)));
        }
        else if (Array.isArray(children)) {
            for (const child of children)
                sequences.push(await spectraChildrenRender(child));
        }
        else if (children instanceof SpectraElement) {
            sequences.push(await spectraRender(children));
        }
        else if (typeof children !== 'object') {
            sequences.push(children?.toString() || "");
        }
        resolve(sequences.join(''));
    });
}
