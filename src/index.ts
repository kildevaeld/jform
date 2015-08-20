/// <reference path="../node_modules/views/views.d.ts" />
//// <reference path="../typings/es6-promise/es6-promise.d.ts" />

import {Form, FormOptions} from './form'
import * as ed from './editors/index'
import {Validator, ValidateFunc} from './validator'
import {Editor, IEditor, CollectionEditor,CollectionEditorOptions} from './editors/editor'
import {FormValidationError} from './types'
export * from './form'

export function create (elm:FormOptions|string|HTMLElement, options:FormOptions={}): Form {
	if (typeof elm === 'string') {
		let e = <HTMLElement>document.querySelector(<string>elm);
		if (!e) return null
		options.el = e

	} else if (elm instanceof HTMLElement) {
		options.el = elm
	} else {
		options = <FormOptions>elm
	}

	return new Form(options)
}

export module editors {

	//export var Editor = Editor
	export var ValidationError = FormValidationError
	export function extend(name: string, prototype: any): IEditor {
		let editor = Editor.extend(prototype,{})
		ed.set(editor, name)
		return editor
	}

	export function get(name:string): IEditor {
		return ed.get(name)
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
