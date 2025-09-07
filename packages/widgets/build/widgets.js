import { Manticore } from "./engine/index.js";
export class Widgets {
    static ServerEngine = undefined;
    static ClientEngine = undefined;
    static Engine = {
        server(widget) {
            return (typeof Widgets.ServerEngine !== 'undefined') ? new Widgets.ServerEngine(widget) : new Manticore(widget);
        },
        client(widget) {
            return (typeof Widgets.ClientEngine !== 'undefined') ? new Widgets.ClientEngine(widget) : (new Manticore(widget));
        },
    };
}
