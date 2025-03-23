import type {IAttributes} from "./attributes.js";
import type {IGlobalAttributes} from "./widget.js";
import type {IStyleDeclaration} from "./style.js";
import type {IPrimitive} from "./value.js";
import type {ISignalController, ITokenList} from "@protorians/core";
import {InsertionPosition, InsertionSiblingPosition} from "../enums.js";


export type IMockupElement<T extends HTMLElement, A extends IAttributes> = T | IMockupSheet<A>;

export type IMockupHooks<A extends IAttributes> = {
  attributes: ISignalController<A>;
  dataset: ISignalController<IGlobalAttributes>;
  style: ISignalController<IStyleDeclaration | CSSStyleDeclaration>;
  classList: ISignalController<ITokenList<string> | DOMTokenList>;
}

export type IMockupMeasure = {
  x: number;
  y: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

export interface IMockup<T extends HTMLElement, A extends IAttributes> {
  hooks: IMockupHooks<A>;

  get instance(): IMockupElement<T, A> | undefined;

  get parent(): IMockup<any, any> | undefined;

  set parent(parent: IMockup<any, any>);

  get tagName(): string;

  get children(): IMockupSheet<any>[] | Element[];

  get attributes(): A;

  get dataset(): IGlobalAttributes;

  get style(): IStyleDeclaration | CSSStyleDeclaration;

  get className(): ITokenList<string> | DOMTokenList;

  get value(): string | null;

  set value(value: IPrimitive);

  get html(): string | null;

  set html(value: string | null);

  get content(): string | null;

  set content(data: string | null);

  get measure(): IMockupMeasure;

  remove(): this;

  removeChild(mockup: IMockup<any, any>): this;

  // removeChild(element: HTMLElement | IMockupSheet<any>): this;

  insert(mockup: IMockup<any, any>, position: InsertionSiblingPosition, child?: IMockup<any, any>): this;

  insert(mockup: IMockup<any, any>, position: InsertionPosition): this;

  prepend(mockup: IMockup<any, any>): this;

  append(mockup: IMockupElement<any, any> | string): this;

  prepare(): this;

  render(): IMockupSheet<A> | HTMLElement | null;
}

export interface IMockupSheet<A extends IAttributes> {
  tagName: string;
  attributes: A;
  dataset: IGlobalAttributes;
  style: IStyleDeclaration;
  classList: ITokenList<string>;
  html: string;
  content: string;
  value: string;
  children: IMockupSheet<any>[];
  innerHTML: string;
  textContent: string;
  nodesTree: IMockup<any, any>[];

  append(element: IMockupElement<any, any> | undefined): void;

  remove(): void;

  render(): IMockupSheet<A>;
}

export type IEditableClientMockup = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export type IMockupContextClientCallable<T, E extends HTMLElement> = (instance: E) => T;
export type IMockupContextServerCallable<T, A extends IAttributes> = (instance: IMockupSheet<A>) => T;
export type IMockupContextAnyCallable<T, E extends HTMLElement, A extends IAttributes> = (instance: IMockupElement<E, A>) => T;

export type IMockupContextOptions<T, E extends HTMLElement, A extends IAttributes> = {
  any?: IMockupContextAnyCallable<T, E, A>,
  client?: IMockupContextClientCallable<T, E>,
  server?: IMockupContextServerCallable<T, A>,
}

