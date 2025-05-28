import type {
    IWalkableList,
    IWalkableListAction,
    IWalkableListActionCallback,
    IWalkableListOptions
} from "../types/walkable";
import {WalkableAction} from "../enums";
import {adjustNumber} from "../utilities";

/**
 * Represents a walkable list that supports various actions, navigation, and optional looping.
 *
 * @template T The type of elements contained in the walk list.
 * @implements {IWalkableList<T>}
 */
export class WalkableList<T> implements IWalkableList<T> {

    protected _actions: Map<WalkableAction, IWalkableListActionCallback<T>> = new Map();
    protected _index: number = 0;
    protected _oldIndex: number | undefined;

    constructor(
        protected _list: T[] = [],
        protected _options: IWalkableListOptions = {} as IWalkableListOptions
    ) {
        this._options.loop = typeof this._options.loop === 'undefined' ? true : this._options.loop;
    }

    /**
     * Retrieves the list of items.
     *
     * @return {T[]} The array of items currently stored.
     */
    get list(): T[] {
        return this._list;
    }

    /**
     * Retrieves the current walking list options.
     *
     * @return {IWalkableListOptions} The configuration options for the walking list.
     */
    get options(): IWalkableListOptions {
        return this._options;
    }

    /**
     * Retrieves the map of actions where each action type is associated with its corresponding callback.
     *
     * @return {Map<WalkableAction, IWalkableListActionCallback<T>>} A map containing action types as keys and their respective callback implementations as values.
     */
    get actions(): Map<WalkableAction, IWalkableListActionCallback<T>> {
        return this._actions;
    }

    /**
     * Retrieves the current value of the index.
     *
     * @return {number} The value of the index.
     */
    get index(): number {
        return this._index;
    }

    get current(): T | undefined {
        return this.item(this._index);
    }

    get oldIndex(): number | undefined {
        return this._oldIndex;
    }

    get old(): T | undefined {
        return this._oldIndex ? this.item(this._oldIndex) : undefined;
    }

    /**
     * Updates the internal list with the provided array of items.
     *
     * @param {T[]} list - The new list of items to replace the current list.
     * @return {this} The current instance for method chaining.
     */
    update(list: T[]): this {
        this._list = list;
        return this;
    }

    /**
     * Registers an action by associating a type with a callable function.
     *
     * @param {Object} args - Object containing the action type and callable function.
     * @param {string} args.type - The type of the action to be registered.
     * @param {Function} args.callable - The function to be executed for the specified action type.
     * @return {this} Returns the current instance to allow method chaining.
     */
    action({type, callable}: IWalkableListAction<T>): this {
        this._actions.set(type, callable);
        return this;
    }

    /**
     * Retrieves an item from the internal list at the specified index.
     * If the index is out of bounds and looping is enabled, it selects the first item.
     *
     * @param {number} index - The position of the item in the list to retrieve.
     * @return {T | undefined} The item at the specified index, or undefined if the index is out of range.
     */
    item(index: number): T | undefined {
        return this._list[index] || undefined;
    }

    /**
     * Clears all actions and resets the list to an empty state.
     *
     * @return {this} The current instance for chaining.
     */
    clear(): this {
        this._actions.clear();
        this._list = [];
        return this;
    }

    /**
     * Executes an action for a specific item in the walk list based on the given index and action type.
     *
     * @param {number} index - The index of the item to perform the action on.
     * @param {WalkableAction} [type=WalkListActionType.Go] - The type of action to perform. Defaults to WalkListActionType.Go.
     * @return {this} Returns the current instance for method chaining.
     */
    jump(index: number, type: WalkableAction = WalkableAction.Jump): this {
        const limit = this._list.length - 1;
        if (index > limit && this._options.loop) index = 0;
        if (index < 0 && this._options.loop) index = limit;

        const item = this.item(index);
        if (item) {
            this._oldIndex = this._index;
            const old = this.item(this._oldIndex);
            this._index = adjustNumber(index, 0, this._list.length - 1);
            (this._actions.get(type))?.({type, item, old, index: this.index, oldIndex: this._oldIndex});
        }
        return this;
    }

    /**
     * Moves to the next item in the list by incrementing the current position.
     *
     * @return {this} The current instance for method chaining.
     */
    next(): this {
        return this.jump(this._index + 1, WalkableAction.Next);
    }

    /**
     * Moves to the previous element in the list.
     * If the current element is at the beginning of the list,
     * it cycles back to the last element.
     *
     * @return {this} Returns the current instance for method chaining.
     */
    previous(): this {
        return this.jump(this._index - 1, WalkableAction.Previous);
    }

    /**
     * Moves to the first item in the list.
     *
     * @return {this} Returns the current instance after navigating to the first item.
     */
    first(): this {
        return this.jump(0, WalkableAction.First);
    }

    /**
     * Moves to the last element in the list.
     *
     * @return {this} The current instance after navigating to the last element.
     */
    last(): this {
        return this.jump(this._list.length - 1, WalkableAction.Last);
    }
}