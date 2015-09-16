/// <reference path="../node_modules/views/views.d.ts" />
import { Form, FormOptions } from './form';
import * as ed from './editors/index';
import { ValidateFunc } from './validator';
import { IEditor } from './editors/editor';
import { FormValidationError } from './types';
export * from './form';
export declare function create(elm: FormOptions | string | HTMLElement, options?: FormOptions): Form;
export declare function createError(msg: string): Error;
export declare module editors {
    var ValidationError: typeof FormValidationError;
    function extend(name: string, prototype: any, staticProps?: any): IEditor;
    function get(name: string): IEditor;
    function set(name: string, editor: ed.EditorContructor): void;
}
export declare module validators {
    function add(name: string, fn: ValidateFunc, message?: string): void;
    function addMessage(name: string, message: string): void;
}
