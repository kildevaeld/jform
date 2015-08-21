import {TemplateView, TemplateViewOptions, utils} from 'views'
import * as editors from './editors/index'
import {IEditor} from './editors/editor'
import {FormError, FormValidationError,FormEditorValidationError, IValidator, IValidation} from './Types'
import {Validator, errorToPromise} from './validator'

export interface IEditorOptions extends TemplateViewOptions {
  name: string
}

export interface FormOptions extends TemplateViewOptions {
  selector?: string
  attribute?: string
  editors?: {[key: string]: IEditorOptions}
  strict?:boolean
  validator?: IValidator
}

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

function renderMessage(view:IEditor, msg:string) {
  if (!msg) return null
  return msg.replace(/\{{name\}}/,view.label||view.name)
}


function asyncEach<T>(array:T[], iterator:(value:T) => Promise<void>, context?:any, accumulate = false): Promise<void> {

  return new Promise<void>(function (resolve, reject) {
    let i = 0, len = array.length,
      errors = [];
    function next (err, result?:any) {
      if (err && !accumulate) return reject(err);
      if (err) errors.push(err);
      if (i === len)
        return errors.length ? reject(flatten(errors)) : resolve();

      iterator(array[i++]).then(function (r) { next(null, r); }, next);
    }

    next(null);

  });

}



function all<T>(array:Promise<T>[]): Promise<T[]> {
  let errors = [], len = array.length, results = Array<T>(len), i = 0, count = len - 0;

  if (len === 0) return Promise.resolve()

  return new Promise(function (resolve, reject) {

    function done (promise:Promise<T>, index:number) {
      promise.then(function (result) {
        results[index] = result;
        //console.log('count',count)
        if ((--count) === 0)
          return errors.length ? reject(flatten(errors)) : resolve(results.length ? results : null);
      }, function (err) {
        errors.push(err)
        if ((--count) === 0)
          reject(flatten(errors));
      })
    }

    for (i; i<len;i++) {

      done(array[i], i);
    }

  });
}


export declare type EditorMap = { [key: string]: IEditor }

export declare type FormValueMap = {[key: string]: any}

export class Form extends TemplateView<HTMLFormElement> {
  static get defaults() { return { selector:'[name]', attribute:'form-editor'}}

  // Privates
  private _value: any
  private _editors: EditorMap
  private _validator: IValidator
  private _validations: {[key: string]: IValidation[]}

  public strict: boolean

  constructor (options?: FormOptions) {

    if (options != null) {
      options = utils.extend({},Form.defaults, options)
    }

    super(options);

    this.strict = options.strict||this.strict||false

    this._validator = options.validator|| new Validator();
    this._validations = {};

  }

  render (options:any): any {
    this._destroyEditors();
    super.render(options);
    this._renderEditors();
    return this;
  }

  get val (): FormValueMap {
    return this.getValue();
  }

  set val(values: FormValueMap) {
    this.setValue(values)
  }

  get editors (): EditorMap {
    return utils.extend({},this._editors);
  }

  setValue (values: FormValueMap): any {
    this.trigger("before:setvalue")

    for (let key in values) {
      if (this.editors[key]) {
        this.trigger('before:setvalue:' + key)

        try {
          this.editors[key].setValue(values[key])
        } catch (e) {

        }

        this.trigger('setvalue:' + key)
      } else {
        let msg = `form does not have an editor for: '${key}'`
        if (this.strict) throw new FormError(msg)
        console.warn(msg)
      }
    }

    this.trigger('setvalue')

    return this
  }

  getValue(): FormValueMap {
    let values: FormValueMap = {}

    for (let key in this.editors) {
      let e = this.editors[key];
      values[key] = e.getValue();
    }

    return values;
  }

  clear () {
    this.triggerMethod('before:clear')
    for (let key in this.editors) {
      this.editors[key].clear()
    }
    this.triggerMethod('clear');
  }

  public validateEditor(name:string): Promise<void> {
    let editor = this.editors[name]
    if (!editor) return Promise.reject(new FormError("no editor named " + name))

    let e = errorToPromise(editor.validate());
    let promises = [];

    if (e) promises.push(e);


    if (this._validations[editor.name]) {
      let value = editor.getValue()

      let p = this._validations[editor.name].map((v) => {
        return errorToPromise(this._validator.validate(editor.el, value, v))
      });

      promises = promises.concat(p);
    }
    return all(promises).catch(function (errors) {
      errors.forEach(function (error) {
        let msg = error.message||Validator.messages[error.name]
        error.message = renderMessage(editor, msg)
      })
      throw new FormEditorValidationError(editor.name, errors)
    })
  }

  public validate (): Promise<{[key:string]:FormEditorValidationError[]}> {

    let editors: IEditor[] = utils.values<IEditor>(this.editors);
    var self = this;
    return asyncEach(editors, (editor) => {

      let e = errorToPromise(editor.validate());
      let promises = [];

      if (e) promises.push(e);


      if (this._validations[editor.name]) {
        let value = editor.getValue()
        let p = this._validations[editor.name].map((v) => {
          return errorToPromise(this._validator.validate(editor.el, value, v))
        });

        promises = promises.concat(p);
      }

      return utils.objectToPromise({[editor.name]:<any>all(promises)}).catch(function (err) {
        throw new FormEditorValidationError(editor.name, err)
      });
    }, this, true).catch( (errors) => {
      let map = {}
      errors.forEach((err) => {
        map[err.name] = err.errors.map( (e) => {
          return {message:renderMessage(this.editors[err.name],e.message||Validator.messages[e.name]), value:e.value, name:e.name}
        });
      });

      return map;
    })

  }


  private _getElements (formEl: HTMLElement, options: FormOptions): {[key: string]: IEditor} {

    let elms: NodeList = formEl.querySelectorAll(options.selector)
    let i: number, elm: HTMLElement, editorName: string, required: string

    let output: EditorMap = {}

    for (i=0;i<elms.length; i++) {

      elm = <HTMLElement>elms[i]
      editorName = elm.getAttribute(options.attribute)
      let name = elm.getAttribute('name')

      editorName = editorName||this._getType(elm)
      let Editor = editors.get(editorName)

      if (Editor == null) {
        let msg = `editor not found: '${editorName}' for '${name}'`
        if (this.strict)
          throw new FormError(msg)
        console.warn(msg)
        continue
      }

      required = elm.getAttribute('required')

      let opts = utils.result(options,name,undefined,[this,options])||{}

      opts = utils.extend(opts, options.editors[name]||{})

      opts.name = name
      opts.el = elm

      if (required != null)
        (opts.validations||(opts.validations = [])).push({
          name: 'required'
        });

      let editor = new (<any>Editor)(opts)

      if (opts.validations && this._validator) {

        if (this._validator.bootstrap) {
          this._validator.bootstrap(elm);
        }

        this._validations[name] = opts.validations

      }

      this.listenTo(editor, 'change', this._onEditorChange);

      /*if (output[name]) {
        let editors = Array.isArray(output[name]) ? output[name] : (output[name] = [output[name]])
      } else {

      }*/
      output[name] = editor;

    }

    return output

  }

  private _renderEditors () {
    this._editors = this._getElements(this.el, (<any>this)._options||{})

    for (let k in this._editors) {
      this._editors[k].render();
    }
  }

  private _destroyEditors () {
    for (let k in this.editors) {
      this.stopListening(this.editors[k]);
      this.editors[k].destroy();
    }
    this._editors = {};
  }

  private _onEditorChange(editor: IEditor) {
    this.trigger('change', editor)
  }

  private _onEditorInvalid(editor: IEditor, error: FormValidationError) {
    this.trigger('invalid', editor, error)
  }

  private _getType(element:HTMLElement): string {

    if (element.nodeName === 'INPUT') {
      return (<HTMLInputElement>element).type;
    } else {
      return element.nodeName.toLowerCase();
    }
  }

  destroy () {
    for (let key in this._editors) {
      this._editors[key].destroy()
    }

    super.destroy()

  }
}
