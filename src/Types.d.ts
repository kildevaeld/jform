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
}
