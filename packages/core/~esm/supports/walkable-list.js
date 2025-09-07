import { WalkableAction } from "../enums.js";
import { NumberUtility } from "../utilities/index.js";
var adjustNumber = NumberUtility.adjust;
export class WalkableList {
    constructor(_list = [], _options = {}) {
        this._list = _list;
        this._options = _options;
        this._actions = new Map();
        this._index = 0;
        this._options.loop = typeof this._options.loop === "undefined" ? true : this._options.loop;
    }
    get list() {
        return this._list;
    }
    get options() {
        return this._options;
    }
    get actions() {
        return this._actions;
    }
    get index() {
        return this._index;
    }
    get current() {
        return this.item(this._index);
    }
    get oldIndex() {
        return this._oldIndex;
    }
    get old() {
        return this._oldIndex ? this.item(this._oldIndex) : undefined;
    }
    update(list) {
        this._list = list;
        return this;
    }
    action({ type, callable }) {
        this._actions.set(type, callable);
        return this;
    }
    item(index) {
        return this._list[index] || undefined;
    }
    clear() {
        this._actions.clear();
        this._list = [];
        return this;
    }
    jump(index, type = WalkableAction.Jump) {
        var _a;
        const limit = this._list.length - 1;
        if (index > limit && this._options.loop)
            index = 0;
        if (index < 0 && this._options.loop)
            index = limit;
        const item = this.item(index);
        if (item) {
            this._oldIndex = this._index;
            const old = this.item(this._oldIndex);
            this._index = adjustNumber(index, 0, this._list.length - 1);
            (_a = (this._actions.get(type))) === null || _a === void 0 ? void 0 : _a({ type, item, old, index: this.index, oldIndex: this._oldIndex });
        }
        return this;
    }
    next() {
        return this.jump(this._index + 1, WalkableAction.Next);
    }
    previous() {
        return this.jump(this._index - 1, WalkableAction.Previous);
    }
    first() {
        return this.jump(0, WalkableAction.First);
    }
    last() {
        return this.jump(this._list.length - 1, WalkableAction.Last);
    }
}
