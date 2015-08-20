import { Editor } from './editor';
export declare class InputEditor<U> extends Editor<HTMLInputElement, U> {
    private _prev;
    events: any;
    setValue(value: U): void;
    getValue(): U;
    clear(): void;
    _onChange(): void;
}
