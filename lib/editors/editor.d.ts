import { TemplateView, ViewOptions, IView, IEventEmitter, CollectionView, CollectionOptions, IModel } from 'views';
import { FormValidationError } from '../Types';
export interface IEditor extends IView, IEventEmitter {
    name: string;
    label?: string;
    setValue(value: any): any;
    getValue(): any;
    clear(): any;
    validate(): FormValidationError | Promise<boolean>;
}
export interface EditorOptions extends ViewOptions {
    label?: string;
    name: string;
    defaultValue?: any;
}
export interface CollectionEditorOptions<U extends IModel> extends CollectionOptions<U> {
    name: string;
    label?: string;
    defaultValue?: any;
}
export declare class Editor<T extends HTMLElement, U> extends TemplateView<T> implements IEditor {
    private _name;
    private _defaultValue;
    label: string;
    name: string;
    value: U;
    constructor(options: EditorOptions);
    setValue(value: U): void;
    getValue(): U;
    clear(): void;
    validate(): FormValidationError;
    triggerChange(e?: any): void;
    render(): Editor<T, U>;
    setDefault(): void;
}
export declare class CollectionEditor<T extends HTMLElement, U extends IModel> extends CollectionView<T> implements IEditor {
    private _name;
    private _defaultValue;
    name: string;
    value: U;
    constructor(options: CollectionEditorOptions<U>);
    setValue(value: U): void;
    getValue(): U;
    clear(): void;
    validate(): FormValidationError;
    triggerChange(e?: any): void;
    setDefault(): void;
}
