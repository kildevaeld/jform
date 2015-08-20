import { View, ViewOptions } from 'views';
import { IEditor } from './editors/editor';
import { FormEditorValidationError, IValidator } from './Types';
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
    validator?: IValidator;
}
export declare type EditorMap = {
    [key: string]: IEditor;
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
    private _validator;
    private _validations;
    strict: boolean;
    constructor(options?: FormOptions);
    val: FormValueMap;
    editors: EditorMap;
    setValue(values: FormValueMap): any;
    getValue(): FormValueMap;
    clear(): void;
    validate(): Promise<{
        [key: string]: FormEditorValidationError[];
    }>;
    private getElements(formEl, options);
    private _onEditorChange(editor);
    private _onEditorInvalid(editor, error);
    private _getType(element);
    destroy(): void;
}
