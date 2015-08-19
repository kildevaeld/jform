import { View, ViewOptions } from 'views/lib/view';
import { IView } from 'views/lib/baseview';
import { IEventEmitter } from 'views/lib/events';
import { FormValidationError } from './Types';
export interface IEditor extends IView, IEventEmitter {
    name: string;
    setValue(value: any): any;
    getValue(): any;
    clear(): any;
    validate(): FormValidationError;
}
export interface EditorOptions extends ViewOptions {
    name: string;
}
export declare class Editor<T extends HTMLElement, U> extends View<T> implements IEditor {
    private _name;
    name: string;
    value: U;
    constructor(options: EditorOptions);
    setValue(value: U): void;
    getValue(): U;
    clear(): void;
    validate(): FormValidationError;
    triggerChange(e?: any): void;
}
export declare class InputEditor extends Editor<HTMLInputElement, string> {
    private _prev;
    events: any;
    setValue(value: string): void;
    getValue(): string;
    _onChange(): void;
}
export declare function has(editor: string): boolean;
export declare function get(editor: string): IEditor;
export declare function set(editor: IEditor, name: string): void;
