/// <reference path="../node_modules/views/views.d.ts" />
import { Form, FormOptions } from './form';
import { ValidateFunc } from './validator';
import { IEditor } from './editors/editor';
export * from './form';
export declare function create(elm: FormOptions | string | HTMLElement, options?: FormOptions): Form;
export declare module editors {
    function extend(name: string, prototype: any): IEditor;
    function get(name: string): IEditor;
}
export declare module validators {
    function add(name: string, fn: ValidateFunc, message?: string): void;
    function addMessage(name: string, message: string): void;
}
