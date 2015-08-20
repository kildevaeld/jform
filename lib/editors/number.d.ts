import { Editor, EditorOptions } from './editor';
export interface NumberEditorOptions extends EditorOptions {
    float?: boolean;
}
export declare class NumberEditor extends Editor<HTMLInputElement, number> {
    _floating: boolean;
    constructor(options: NumberEditorOptions);
    _onKeyPress(e: any): void;
    setValue(value: number): void;
    getValue(): number;
    clear(): void;
}
