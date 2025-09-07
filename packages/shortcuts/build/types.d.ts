import { ISignalStack } from "@protorians/core";
import { ShortcutScope } from "./enum.js";
export type IShortcutTrigger = (event: KeyboardEvent) => void;
export interface IShortcutSequence {
    sequence: string[];
    trigger: IShortcutTrigger;
}
export interface IShortcutOptions {
    trigger: IShortcutTrigger;
    scope?: ShortcutScope;
    focused?: boolean;
    timeout?: number;
    prevent?: boolean;
}
export interface IShortcut<T extends HTMLElement> {
    readonly targets: T[];
    signal: ISignalStack<IShortcutSignalMap>;
    get shortcuts(): IShortcutSequence[];
    get focused(): boolean;
    enable(): this;
    disable(): this;
    resolveScope(target: T, scope: ShortcutScope | undefined): T | HTMLElement | undefined;
    mount(keys: string[], callback: IShortcutTrigger): this;
    unmount(keys: string[]): this;
    clear(): this;
    destroy(): void;
}
export interface IShortcutSignalMap {
    trigger: KeyboardEvent;
    mount: IShortcutSequence;
    unfocused: KeyboardEvent;
    unmount: string[];
    enable: undefined;
    disable: undefined;
}
