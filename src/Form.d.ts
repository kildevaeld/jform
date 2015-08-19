import { View, ViewOptions } from 'views/lib/view';
import * as editors from './Editors';
import { FormValidationError } from './Types';
export interface IEditorOptions extends ViewOptions {
    name: string;
}
export interface FormOptions extends ViewOptions {
    selector?: string;
    attribute?: string;
    editors?: {
        [key: string]: IEditorOptions;
    };
    strict?: boolean;
}
export declare type EditorMap = {
    [key: string]: editors.IEditor;
};
export declare type FormValueMap = {
    [key: string]: any;
};
export declare class Form extends View<HTMLFormElement> {
    static defaults: {
        selector: string;
        attribute: string;
    };
    private _value;
    private _editors;
    strict: boolean;
    constructor(options?: FormOptions);
    val: FormValueMap;
    editors: EditorMap;
    setValue(values: FormValueMap): any;
    validate(): {
        [key: string]: FormValidationError;
    };
    private getElements(formEl, options);
    private _onEditorChange(editor);
    private _onEditorInvalid(editor, error);
    private _getType(element);
    destroy(): void;
}
