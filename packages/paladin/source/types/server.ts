import type {ISignalStack, ISignalStackCallable} from "@protorians/core";
import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

export interface IServerInstance extends FastifyInstance {
}

export interface IServerRequest extends FastifyRequest {
}

export interface IServerResponse extends FastifyReply {
}

export interface IServerOptions {
    logger?: boolean;
    port?: number;
}

export interface IServerIncomingPayload {
    request: IServerRequest;
    response: IServerResponse;
}

export interface IServerSignalMap {

}

export type IServerSignal = ISignalStack<IServerSignalMap>

export type IServerSignalCallable = ISignalStackCallable<IServerSignalMap>

export type IServerMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'