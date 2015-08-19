import { View } from 'views/lib/view';
import { IModel } from 'views/lib/types';
import { CollectionViewOptions } from 'views/lib/collection-view';
import { IEditor, EditorOptions } from '../Editors';
import { FormValidationError } from '../Types';
import { Model } from 'views/lib/model';
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
