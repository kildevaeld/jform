import { Editor, EditorOptions } from './editor';
export interface SelectEditorOptions extends EditorOptions {
    float?: boolean;
}
export interface SelectEditorValue {
    value: string;
    text: string;
}
export declare class SelectEditor<U extends SelectEditorValue> extends Editor<HTMLSelectElement, U> {
    constructor(options: SelectEditorOptions);
    setValue(value: U): void;
    getValue(): U;
    clear(): void;
}
