import { Editor } from './editor';
export declare class InputEditor<U> extends Editor<HTMLInputElement, U> {
    private _prev;
    setValue(value: U): void;
    getValue(): U;
    clear(): void;
    _onChange(): void;
}
