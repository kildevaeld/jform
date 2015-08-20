import {Editor} from './editor'
import {utils} from 'views'

export class InputEditor<U> extends Editor<HTMLInputElement, U> {
  private _prev: string
  get events (): any {
    return {
      'change': '_onChange'
    }
  }
  setValue(value: U) {
    if (this.el.nodeName === 'INPUT' && !!~['checkbox', 'radio'].indexOf(this.el.type)) {
       this.el.checked = !!value;
    } else if (this.el.nodeName === 'INPUT' && this.el.type === 'file') {
        // Cannot set file input
    } else {
      this.el.value = <any>(value == null ? "" : value)
    }

  }

  getValue(): U {
    if (this.el.nodeName === 'INPUT' && ~['checkbox', 'radio'].indexOf(this.el.type)) {
      return <any>this.el.checked;
    } else if (this.el.nodeName === 'INPUT' && this.el.type === 'file') {
      return <any>this.el.files;
    }
    return <any>(this.el.value === '' ? null : this.el.value)
  }

  clear () {
    this.el.value = ''
    this.setDefault();
  }

  _onChange() {
    let current = this.getValue()
    if (utils.equal(current, this._prev)) { return }
    this.triggerChange()
  }

}