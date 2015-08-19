/// <reference path="../node_modules/views/views.d.ts" />
import { Form } from './Form';
import * as ed from './Editors';
import { ValidateFunc } from './validator';
export default Form;
export * from './Form';
export declare module editors {
    var Editor: typeof ed.Editor;
    function extend(name: string, prototype: any): ed.IEditor;
}
export declare module validators {
    function add(name: string, fn: ValidateFunc, message?: string): void;
    function addMessage(name: string, message: string): void;
}
