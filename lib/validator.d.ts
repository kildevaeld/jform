/// <reference path="../node_modules/views/views.d.ts" />
import { IValidator, IValidation, FormValidationError } from './types';
export declare type ValidateFunc = (el: HTMLElement, value: any) => FormValidationError | Promise<void>;
export declare class Validator implements IValidator {
    static validators: {
        [key: string]: ValidateFunc;
    };
    static messages: {
        [key: string]: string;
    };
    validate(el: HTMLElement, value: any, validate: IValidation): Promise<any>;
}
