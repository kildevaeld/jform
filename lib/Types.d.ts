export declare class FormError implements Error {
    name: string;
    message: string;
    code: number;
    constructor(message?: string, code?: number);
    toString(): string;
    toJSON(): {
        name: string;
        message: string;
        code: number;
    };
}
export declare class FormValidationError extends FormError {
    name: string;
    value: any;
    constructor(name: string, value: any, message?: string);
}
export declare class FormEditorValidationError extends FormError {
    name: string;
    errors: FormValidationError[];
    constructor(name: string, error: FormValidationError[]);
    toJSON(): any;
}
export interface IValidation {
    name: string;
    args?: any[];
}
export interface IValidator {
    bootstrap?: <T extends HTMLElement>(el: T) => void;
    validate<T extends HTMLElement>(el: T, value: any, validator: IValidation): FormValidationError | Promise<void>;
}
