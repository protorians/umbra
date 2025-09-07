export class ProviderAgent {
    _declarations = {};
    _scopes = [];
    _blocks = [];
    get blocks() {
        return this._blocks;
    }
    get declarations() {
        return this._declarations;
    }
    get scopes() {
        return this._scopes;
    }
    searchBlocks(names, source) {
        names.split(',').forEach((name) => {
            name = name.trim();
            const regex = new RegExp(`@layer ${name}\\s{([\\s\\S]*?)}`, 'g');
            let match = null;
            while ((match = regex.exec(source)) !== null) {
                this._blocks.push(match[1].trim());
            }
        });
        return this;
    }
    searchDeclarations() {
        const regex = /--[\w-]+:\s*([^;]+);/g;
        let match = null;
        this._blocks
            .forEach((block) => {
            while ((match = regex.exec(block)) !== null) {
                this._declarations[match[0].split(':')[0].trim()] = match[1].trim();
            }
        });
        return this;
    }
    searchScopes(source) {
        const regex = /var\(--([\w-]+)(?:,[^)]*)?\)/g;
        let match = null;
        while ((match = regex.exec(source)) !== null) {
            this._scopes.push(`--${match[1].trim()}`);
        }
        return this;
    }
    search(name, source) {
        return this
            .searchBlocks(name, source)
            .searchDeclarations()
            .searchScopes(source);
    }
}
