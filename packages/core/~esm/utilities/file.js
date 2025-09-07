var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export var FileUtility;
(function (FileUtility) {
    function readBlob(blob) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = () => reject(reader.error);
                reader.readAsDataURL(blob);
            });
        });
    }
    FileUtility.readBlob = readBlob;
    function JsonParser(input) {
        return JSON.parse(input
            .replace(/\/\/.*(?=[\n\r])/g, '')
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/,\s*([}\]])/g, '$1'));
    }
    FileUtility.JsonParser = JsonParser;
})(FileUtility || (FileUtility = {}));
