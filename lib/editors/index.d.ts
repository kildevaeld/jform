/// <reference path="../../node_modules/views/views.d.ts" />
import { InputEditor } from './input-editor';
import { ListEditor } from './list';
import { NumberEditor } from './number';
import { SelectEditor } from './select';
import { IEditor } from './editor';
export * from './editor';
export declare const editors: {
    input: typeof InputEditor;
    text: typeof InputEditor;
    checkbox: typeof InputEditor;
    radio: typeof InputEditor;
    textarea: typeof InputEditor;
    list: typeof ListEditor;
    number: typeof NumberEditor;
    select: typeof SelectEditor;
};
export declare function has(editor: string): boolean;
export declare function get(editor: string): IEditor;
export declare function set(editor: IEditor, name: string): void;
