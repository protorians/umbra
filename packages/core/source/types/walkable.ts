import {WalkableAction} from "../enums";

export type IWalkableListActionCallback<T> = (payload: IWalkableListActionPayload<T>) => void;

export interface IWalkableListActionPayload<T> {
    item: T;
    old: T | undefined;
    type: WalkableAction;
    index: number;
    oldIndex: number|undefined;
}

export interface IWalkableListAction<T> {
    type: WalkableAction;
    callable: IWalkableListActionCallback<T>
}

export interface IWalkableListOptions {
    loop: boolean;
}


export interface IWalkableList<T> {
    get list(): T[];

    get options(): IWalkableListOptions;

    get actions(): Map<WalkableAction, IWalkableListActionCallback<T>>;

    get index(): number;

    get current(): T | undefined;

    get oldIndex(): number | undefined;

    get old(): T | undefined;

    update(list: T[]): this;

    action(action: IWalkableListAction<T>): this;

    item(index: number): T | undefined;

    clear(): this;

    jump(index: number, type: WalkableAction): this;

    next(): this;

    previous(): this;

    first(): this;

    last(): this;
}