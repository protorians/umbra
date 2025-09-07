export class Configurator {
    static instance;
    _processor;
    _variables = {};
    get processor() {
        return this._processor;
    }
    get variables() {
        return this._variables;
    }
    constructor() {
        Configurator.instance = this;
    }
    setVariables(section, value) {
        this._variables[section] = { ...(this._variables[section] || {}), ...value };
        return this;
    }
    removeVariables(section) {
        const variables = {};
        for (const [layer, sections] of Object.entries(this._variables)) {
            if (layer != section)
                variables[layer] = sections;
        }
        this._variables = variables;
        return this;
    }
    unwrapVariables() {
        const output = {};
        for (const [layer, sections] of Object.entries(this._variables)) {
            for (const [name, section] of Object.entries(sections)) {
                for (const [key, value] of Object.entries(section)) {
                    output[`${layer}:${name.substring(2)}:${key}`] = value;
                }
            }
        }
        return output;
    }
    findVariables(index) {
        const output = [];
        for (const [layer, sections] of Object.entries(this._variables)) {
            for (const [name, section] of Object.entries(sections)) {
                for (const [key, value] of Object.entries(section)) {
                    if (key == index)
                        output.push({
                            layer: layer,
                            section: name,
                            value,
                        });
                }
            }
        }
        return output;
    }
    getVariable(layer, section, key) {
        return this.unwrapVariables()[`${layer}:${section}:${key}`] || undefined;
    }
    getColor(layer, section, key) {
        return this.getVariable(layer, section, `--color-${key}`) || undefined;
    }
    initialize() {
        this._variables = {};
        return this;
    }
}
