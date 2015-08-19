import { View, IModel, CollectionViewOptions, Model } from 'views';
import { IEditor, EditorOptions } from '../Editors';
import { FormValidationError } from '../Types';
export interface ListEditorOptions<U extends IModel> extends CollectionViewOptions, EditorOptions {
    items?: U[];
    values?: U[];
}
export declare class ListEditorModel extends Model {
    idAttribute: string;
}
export declare class ListEditor<U extends IModel> extends View<HTMLDivElement> implements IEditor {
    private _name;
    private _values;
    private _selectView;
    private _listView;
    name: string;
    val: U[];
    constructor(options: ListEditorOptions<U>);
    setValue(values: U[]): void;
    getValue(): U[];
    clear(): void;
    validate(): FormValidationError;
    render(): ListEditor<U>;
    destroy(): void;
}
