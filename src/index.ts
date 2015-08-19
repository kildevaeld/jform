/// <reference path="../node_modules/views/views.d.ts" />
//// <reference path="../typings/es6-promise/es6-promise.d.ts" />

import {Form, FormOptions} from './Form'
import * as ed from './Editors'
import {Validator, ValidateFunc} from './validator'


export * from './Form'

export function create (elm:FormOptions|string, options:FormOptions={}): Form {
	if (typeof elm === 'string') {
		let e = <HTMLElement>document.querySelector(<string>elm);
		if (!e) return null
		options.el = e
		
	} else {
		options = elm
	}
	
	return new Form(options)
}

export module editors {
	
	export var Editor = ed.Editor
	
	export function extend(name: string, prototype: any): ed.IEditor {
		let editor = ed.Editor.extend(prototype,{})
		ed.set(editor, name)
		return editor
	}
}

export module validators {
	export function add (name:string, fn:ValidateFunc, message?:string) {
		Validator.validators[name] = fn
		addMessage(name, message)
	}
	
	export function addMessage(name: string, message:string) {
		Validator.messages[name] = message 
	}
}
