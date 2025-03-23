import {syncObjectArray} from "../utilities";
import {ITokenList} from "../types";

export function TokenList<T>(): ITokenList<T> {

    let entries: T[] = [];

    return {

        get length(): number {
            return entries.length;
        },

        get value(): T {
            return entries.join(' ') as T;
        },

        toString(): string {
            return entries.join(' ');
        },

        add(...tokens: T[]): ITokenList<T> {
            tokens.forEach((token) => {
                if (!this.contains(token)) {
                    entries[entries.length] = token;
                }
            });
            syncObjectArray(this, entries)
            return this;
        },

        contains(token: T): boolean {
            return entries.includes(token)
        },

        item(index: number): (T | null) {
            return entries[index] || null;
        },

        remove(...tokens: T[]): ITokenList<T> {
            entries = entries.filter((token) => !tokens.includes(token))
            syncObjectArray(this, entries)
            return this;
        },

        replace(token: T, newToken: T): boolean {
            let responses: boolean[] = [];

            entries.forEach((value, index) => {
                if (value === token) {
                    entries[index] = newToken;
                    responses[responses.length] = true;
                    return;
                }
                responses[responses.length] = false;
            })

            syncObjectArray(this, entries)
            return responses.every((response) => response)
        },

        supports(token: T): boolean {
            return this.contains(token);
        },

        toggle(token: T, force?: boolean | undefined): boolean {
            if (force !== true) {
                if (this.contains(token)) {
                    this.remove(token)
                    return false;
                } else {
                    this.add(token)
                    return true;
                }
            } else {
                this.add(token)
                return true;
            }
        },

        forEach(callback: (value: T, key: number, parent: ITokenList<T>) => void, thisArg?: any): ITokenList<T> {
            entries.forEach((token, index) =>
                callback.apply(thisArg, [token, index, this])
            )
            return this;
        },

    }
}