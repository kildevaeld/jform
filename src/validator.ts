/// <reference path="../node_modules/views/views.d.ts" />

import {IValidator, IValidation, FormValidationError} from './types'
import {utils} from 'views'
export type ValidateFunc = (el:HTMLElement, value:any) => FormValidationError|Promise<void>

function errorToPromise (err?:any): Promise<void> {
	if (err instanceof Error) {
  	return Promise.reject(err)
  } else if (utils.isPromise(err)) {
   	return err
  } 
  return null
}

export class Validator implements IValidator {
	public static validators: {[key: string]: ValidateFunc} = {}
	public static messages: {[key:string]: string} = {}
	validate(el:HTMLElement, value:any, validate:IValidation) {
		
		if (validate.name === 'required') {
			return value == null ? Promise.reject(new FormValidationError('required', value))	 : null;
		}
		
		if (Validator.validators[validate.name]) {
			let e = Validator.validators[validate.name](el, value);
			return errorToPromise(e);
		}
		return null;
	}
}