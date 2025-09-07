"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Climbing = void 0;
class Climbing {
    constructor(entries, callback, strictMode = true) {
        this.entries = entries;
        this.callback = callback;
        this.strictMode = strictMode;
        this.responses = [];
        this.prepared = undefined;
        this.yield = this.create(entries, callback);
    }
    trigger(done, start = 0) {
        this.next(this.yield(start), done);
        return this;
    }
    create(entries, callback) {
        const self = this;
        this.responses = [];
        return function* (index) {
            while (index < entries.length) {
                yield new Promise((done, fail) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    if (typeof callback == 'function') {
                        const treatment = yield ((_a = callback(index)) === null || _a === void 0 ? void 0 : _a.catch(er => fail(er)));
                        if (treatment)
                            done(treatment);
                        else {
                            if (self.strictMode)
                                fail(true);
                            else
                                done(undefined);
                        }
                    }
                }));
                index++;
            }
        };
    }
    next(prepared, next) {
        const instance = prepared.next();
        if (instance.done) {
            if (typeof next == 'function') {
                next(this);
            }
            return true;
        }
        instance.value
            .then(r => {
            if (r)
                this.responses.push(r);
            this.next(prepared, next);
        })
            .catch(() => (!this.strictMode) ? this.next(prepared, next) : void (0));
        return false;
    }
}
exports.Climbing = Climbing;
