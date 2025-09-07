export class ConsumerAgent {
    name;
    callback;
    constructor(name, callback) {
        this.name = name;
        this.callback = callback;
    }
}
