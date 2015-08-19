import {View, ViewOptions, IView, IEventEmitter, utils} from 'views'

import {FormError, FormValidationError, IValidation} from './Types'
import {ListEditor} from './editors/list'
//import {View, ViewOptions, IView, IEventEmitter, utils} from 'views/lib/index'

class AbstractClassError extends FormError {
  name = "EditorImplementationError"
}

class EditorError extends FormError {
  name = 'EditorError'
}

export interface IEditor extends IView, IEventEmitter {
  name: string
  setValue(value: any)
  getValue(): any
  clear()
  validate(): FormValidationError|Promise<boolean>
  //new(options: EditorOptions): IEditor;
}

export interface EditorOptions extends ViewOptions {
  name: string
}

export class Editor<T extends HTMLElement, U> extends View<T> implements IEditor {
  private _name: string
  
  public get name () {
    return this._name
  }
  
  public get value(): U {
    return this.getValue()
  }
  
  public set value(value: U) {
    this.setValue(value)
  }
  
  constructor (options: EditorOptions) {
  
    if (!options || !options.name) {
      throw new EditorError("no name specified");
    }
    this._name = options.name
    super(options)
  }

  setValue(value: U) { throw new AbstractClassError("setValue not implemented"); }

  getValue(): U { throw new AbstractClassError("getValue not implemented"); }

  clear() { throw new AbstractClassError("clear not implemented"); }

  // no-op
  validate (): FormValidationError {
    return null
  }

  triggerChange (e?) {
    this.triggerMethod('change', this)
  }
}

export class InputEditor extends Editor<HTMLInputElement, string> {
  private _prev: string
  get events (): any {
    return {
      'change': '_onChange'
    }
  }
  setValue(value: string) {
    this.el.value = value
  }

  getValue(): string {
    return this.el.value === '' ? null : this.el.value;
  }
  
  _onChange() {
    let current = this.getValue()
    if (utils.equal(current, this._prev)) { return }
    this.triggerChange()
  }
 
}

const editors = {
  text: InputEditor, 
  textarea: InputEditor,
  list: ListEditor
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
