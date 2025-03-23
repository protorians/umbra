import type {IStringObject, IProviderAgent} from "../types/index.js";

export class ProviderAgent implements IProviderAgent {

  protected _declarations: IStringObject = {};
  protected _scopes: string[] = [];
  protected _blocks: string[] = [];


  get blocks(): string[] {
    return this._blocks;
  }

  get declarations(): IStringObject {
    return this._declarations
  }

  get scopes(): string[] {
    return this._scopes;
  }

  searchBlocks(names: string, source: string): this {

    names.split(',').forEach((name) => {
      name = name.trim();

      const regex = new RegExp(`@layer ${name}\\s{([\\s\\S]*?)}`, 'g');
      let match: RegExpExecArray | null = null;

      while ((match = regex.exec(source)) !== null) {
        this._blocks.push(match[1].trim());
      }
    })

    return this;
  }

  searchDeclarations(): this {
    const regex = /--[\w-]+:\s*([^;]+);/g;
    let match: RegExpExecArray | null = null;

    this._blocks
      .forEach((block) => {
        while ((match = regex.exec(block)) !== null) {
          this._declarations[match[0].split(':')[0].trim()] = match[1].trim();
        }
      })


    return this;
  }

  searchScopes(source: string): this {
    const regex = /var\(--([\w-]+)(?:,[^)]*)?\)/g;
    let match: RegExpExecArray | null = null;

    while ((match = regex.exec(source)) !== null) {
      this._scopes.push(`--${match[1].trim()}`)
    }

    return this;
  }

  search(name: string, source: string): this {
    return this
      .searchBlocks(name, source)
      .searchDeclarations()
      .searchScopes(source)
  }

}