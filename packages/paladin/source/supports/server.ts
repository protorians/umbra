import Fastify from 'fastify';
import {
    IModularView,
    IServerInstance, IServerMethods,
    IServerOptions,
    IServerRequest,
    IServerResponse
} from "../types/index.js";
import {ArcaneEnv, Terminal} from "@protorians/arcane-core";
import {createMiddleware, Middlewares} from './middleware.js';
import activateVerbose = ArcaneEnv.activateVerbose;
import deactivateVerbose = ArcaneEnv.deactivateVerbose;
import {Plugins} from "./plugin.js";
import path from "node:path";
import * as fs from "node:fs";
import {Modulator} from "./modulator.js";
import {ContextWidget, Mockup, WidgetBuilder} from "@protorians/widgets";


export class ServerManager {

}

export class Server {
    protected _instance: IServerInstance | undefined;
    protected _options: IServerOptions = {};

    constructor(public readonly name: string) {
    }

    get instance(): IServerInstance {
        this._instance = this._instance || Fastify({
            logger: false,
            // logger: this._options.logger,
        });
        return this._instance;
    }

    get options(): IServerOptions {
        this._options = this._options || {}
        this._options.logger = typeof this._options.logger == 'undefined' ? true : this._options.logger;
        this._options.port = typeof this._options.port == 'undefined' ? 3000 : this._options.port;
        return this._options;
    }

    logger(logger: boolean): this {
        this._options.logger = logger;
        if (this._options.logger) activateVerbose()
        else deactivateVerbose()
        return this;
    }

    port(port: number): this {
        this._options.port = port;
        return this;
    }

    start(): typeof this {

        const workDir = process.cwd();
        const viewDir = path.resolve(workDir, './build/views');

        for (const plugin of Plugins.stack.values()) {
            if (plugin.options.route)
                this.instance.all(plugin.options.route.path, async (req, reply) => {
                    if (plugin.options.route?.method?.includes(req.method as IServerMethods))
                        plugin.options.route?.callable({request: req, response: reply})
                });

            if (typeof plugin.options.middleware == 'function')
                Middlewares.use(createMiddleware(plugin.options.name, plugin.options.middleware))
        }
        Terminal.Display.highlight('Plugins', 'Ready!')


        this.instance.addHook('preHandler', async (req: IServerRequest, reply: IServerResponse) => {
            await Middlewares.run({request: req, response: reply})
        });
        Terminal.Display.highlight('Middlewares', 'Ready!')


        this.instance.get('/*', async (req, reply) => {
            try {
                const url = req.url.substring(1) || 'index.js';
                const source = path.join(viewDir, url);

                if (!fs.existsSync(source)) {
                    reply.status(404)
                        .send({status: false, cause: 'Page not found'});
                    return;
                }

                const view = await Modulator.import<IModularView>(source);

                if (typeof view === 'undefined') {
                    reply.status(404)
                        .send({status: false, cause: 'View not found'});
                    return;
                }

                if (typeof view.default !== 'function') {
                    reply.status(404)
                        .send({status: false, cause: 'View has not a main function'});
                    return;
                }

                const states = {} as any;
                const props = req.params as Object;
                const widget = view.default.construct(req.params as Object);

                if (typeof widget === 'undefined') {
                    reply.status(404)
                        .send({status: false, cause: 'No widget rendered'});
                    return;
                }

                const context = new ContextWidget<any, any>(widget, props, states)
                context.root = widget;
                WidgetBuilder(widget, context);
                const rendering = (widget.element as Mockup.Morphic<any, any>).render()

                Terminal.Display.notice('VIEW', rendering, JSON.stringify(rendering));

                reply
                    // .type('text/html')
                    .status(201)
                    .send({status: true});
            } catch (e) {
                Terminal.Display.error('ERR', e)
                reply.status(500)
                    .send({status: false, cause: e});
            }

        });

        this.instance.listen({port: this.options.port}, (err) => {
            if (err) throw err;
            console.log(`@Protorians/Paladin is available on http://localhost:${this.options.port}`);
        });
        return this;
    }
}