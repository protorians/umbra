import type { IWalkableList, IWalkableListAction, IWalkableListActionCallback, IWalkableListOptions } from "../types/walkable.js";
import { WalkableAction } from "../enums.js";
export declare class WalkableList<T> implements IWalkableList<T> {
    protected _list: T[];
    protected _options: IWalkableListOptions;
    protected _actions: Map<WalkableAction, IWalkableListActionCallback<T>>;
    protected _index: number;
    protected _oldIndex: number | undefined;
    constructor(_list?: T[], _options?: IWalkableListOptions);
    get list(): T[];
    get options(): IWalkableListOptions;
    get actions(): Map<WalkableAction, IWalkableListActionCallback<T>>;
    get index(): number;
    get current(): T | undefined;
    get oldIndex(): number | undefined;
    get old(): T | undefined;
    update(list: T[]): this;
    action({ type, callable }: IWalkableListAction<T>): this;
    item(index: number): T | undefined;
    clear(): this;
    jump(index: number, type?: WalkableAction): this;
    next(): this;
    previous(): this;
    first(): this;
    last(): this;
}
