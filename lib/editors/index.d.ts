/// <reference path="../../node_modules/views/views.d.ts" />
import { IEditor } from './editor';
export declare function has(editor: string): boolean;
export declare function get(editor: string): IEditor;
export declare function set(editor: IEditor, name: string): void;
