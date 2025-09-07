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
exports.ProcessUtility = void 0;
var ProcessUtility;
(function (ProcessUtility) {
    function sleep() {
        return __awaiter(this, arguments, void 0, function* (ms = 1000) {
            return new Promise(resolve => setTimeout(resolve, ms));
        });
    }
    ProcessUtility.sleep = sleep;
})(ProcessUtility || (exports.ProcessUtility = ProcessUtility = {}));
