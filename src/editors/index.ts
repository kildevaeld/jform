/// <reference path="../../node_modules/views/views.d.ts" />
import {InputEditor} from './input-editor'
import {ListEditor} from './list'
import {NumberEditor} from './number'
import {SelectEditor} from './select'
import {IEditor} from './editor'


export * from './editor'

export const editors = {
  input: InputEditor,
  text: InputEditor,
  checkbox: InputEditor,
  radio: InputEditor,
  textarea: InputEditor,
  list: ListEditor,
  number: NumberEditor,
  select: SelectEditor
}


export function has (editor: string): boolean {
  return get(editor) != null
}

export function get (editor: string): IEditor {
  return editors[editor]
}

export function set(editor:IEditor, name: string) {
  editors[name] = editor
}
