

export class FormError implements Error {
  name: string = "FormError"
  message: string
  code: number
  constructor(message?: string, code?: number) {
    this.message = message
  }
  toString () {
    return `${this.name}: ${this.message}`  
  }
  
  toJSON () {
    return {
      name: this.name,
      message: this.message,
      code: this.code
    }
  }
}


export class FormValidationError extends FormError {
  name: string = "FormValidationError"
  value: any
  constructor(name:string, value:any, message?: string) {
    super(message)
    
    this.name = name
    this.value = value
    
  }
}

export class FormEditorValidationError extends FormError {
  name: string
  errors: FormValidationError[]
  constructor(name:string, error:FormValidationError[]) {
    super(null);
    this.name = name
    this.errors = error
  }
}

export interface IValidation {
  name: string
  args?: any[]
}

export interface IValidator {
  bootstrap?: <T extends HTMLElement>(el: T) => void
  validate<T extends HTMLElement>(el:T, value:any, validator:IValidation): FormValidationError|Promise<void>
} 