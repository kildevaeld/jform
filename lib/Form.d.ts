import { TemplateView, TemplateViewOptions } from 'views';
import { IEditor } from './editors/editor';
import { FormEditorValidationError, IValidator } from './Types';
export interface IEditorOptions extends TemplateViewOptions {
    name: string;
}
export interface FormOptions extends TemplateViewOptions {
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
export declare class Form extends TemplateView<HTMLFormElement> {
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
    render(options: any): any;
    val: FormValueMap;
    editors: EditorMap;
    setValue(values: FormValueMap): any;
    getValue(): FormValueMap;
    clear(): void;
    validateEditor(name: string): Promise<void>;
    validate(): Promise<{
        [key: string]: FormEditorValidationError[];
    }>;
    private _getElements(formEl, options);
    private _renderEditors();
    private _destroyEditors();
    private _onEditorChange(editor);
    private _onEditorInvalid(editor, error);
    private _getType(element);
    destroy(): void;
}
