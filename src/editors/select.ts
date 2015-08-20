import {events, View} from 'views'
import {Editor, EditorOptions} from './editor'

export interface SelectEditorOptions extends EditorOptions {
  float?: boolean
}


export interface SelectEditorValue {
  value: string
  text: string
}

@events({
  'change': 'triggerChange'
})
export class SelectEditor<U extends SelectEditorValue> extends Editor<HTMLSelectElement, U> {
  constructor (options:SelectEditorOptions) {
    super(options)
  }

  setValue (value:U) {
    var index = null
    for (var i = 0; i<this.el.options.length; i++) {
      var o = this.el.options[i];
      if (o.value === value.value && o.innerText === value.text) {
        index = i
        break;
      }
    }
    if (index !== null) {
      this.el.selectedIndex = index
    }
  }
  
  getValue (): U {
    var elm = this.el.options[this.el.selectedIndex]
    return <U>{
      value: elm.value,
      text: elm.innerText  
    }
  }
  
  clear () {
    
    this.setDefault();
  }

}