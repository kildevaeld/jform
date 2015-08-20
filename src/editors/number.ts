import {events, View} from 'views'
import {Editor, EditorOptions} from './editor'

export interface NumberEditorOptions extends EditorOptions {
  float?: boolean
}


@events({
  'keypress': '_onKeyPress'
})
export class NumberEditor extends Editor<HTMLInputElement, number> {
  _floating: boolean
  constructor (options:NumberEditorOptions) {
    super(options)
    
    this._floating = true// options.float == null ? false : options.float
    
  }


  _onKeyPress (e) {
    
		var real_val = String.fromCharCode(e.which),
      cur_val = this.el.value
    
    
    // backspace
    if (e.which == 8) real_val = real_val.substr(0, real_val.length - 2);
    
    if (!~cur_val.indexOf(',') && real_val === ',' && this._floating) {
      let sel = this.el.selectionStart
      
      if (cur_val == '' || sel === 0) {
        this.el.value = '0,' + this.el.value
        
        this.el.setSelectionRange(2,2)
      } else {
        return 
      }
      
    }
		if (isNaN(parseFloat(real_val))) {
			e.preventDefault()
		}
  }
  
  setValue (value:number) {
    this.el.value = "" +  (this._floating ? value : Math.round(value)) 
  }
  
  getValue (): number {
    let value = this.el.value;
    if (value === '') return null;
    return this._floating ? parseFloat(value.replace(',','.')) : parseInt(value)
  }
  
  clear () {
    this.el.value = ''
    this.setDefault();
  }

}