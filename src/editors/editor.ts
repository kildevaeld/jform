import {TemplateView, View, ViewOptions, IView, IEventEmitter, utils, CollectionView, CollectionOptions, IModel} from 'views'

import {FormError, FormValidationError, IValidation} from '../Types'



class AbstractClassError extends FormError {
  name = "EditorImplementationError"
}

class EditorError extends FormError {
  name = 'EditorError'
}

export interface IEditor extends IView, IEventEmitter {
  name: string
  label?:string
  setValue(value: any)
  getValue(): any
  clear()
  validate(): FormValidationError|Promise<boolean>
  //new(options: EditorOptions): IEditor;
}

export interface EditorOptions extends ViewOptions {
  labe?:string
  name: string
  defaultValue?: any
}

export interface CollectionEditorOptions<U extends IModel> extends CollectionOptions<U> {
  name: string
  label?:string
  defaultValue?: any
}

export class Editor<T extends HTMLElement, U> extends TemplateView<T> implements IEditor {
  private _name: string
  private _defaultValue: any
  label:string
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
    this.label = options.label
    this._name = options.name
    this._defaultValue = options.defaultValue


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

  render () {
    this.undelegateEvents();
    super.render();
    this.delegateEvents();
    return this;
  }

  setDefault () {
    if (this._defaultValue != null) this.setValue(this._defaultValue)
  }
}

export class CollectionEditor<T extends HTMLElement, U extends IModel> extends CollectionView<T> implements IEditor {
  private _name: string
  private _defaultValue: any
  public get name () {
    return this._name
  }

  public get value(): U {
    return this.getValue()
  }

  public set value(value: U) {
    this.setValue(value)
  }

  constructor (options: CollectionEditorOptions<U>) {

    if (!options || !options.name) {
      throw new EditorError("no name specified");
    }

    this._name = options.name
    this._defaultValue = options.defaultValue;

    super(<any>options)
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

  setDefault () {
    if (this._defaultValue != null) this.setValue(this._defaultValue)
  }

}