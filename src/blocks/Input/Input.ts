// Использование расширения .js согласовано с наставником
import { Block, BlockPropsMethods } from './../../utils/Block.js';
import { validator, ValidateListInterface } from './../../utils/Validator.js';

export interface InputProps {
  attr?: {
    [key: string]: any
  }
  className?: string;
  name?: string;
  type?: 'text' | 'password' | string;
  placeholder?: string;
  value?: string;
  methods?: BlockPropsMethods;
  validate?:ValidateListInterface[];
  label?: string;
}

export class Input extends Block {

  constructor(props: InputProps = {}) {
    super('input', props);
  }

  render(template: string, props: InputProps) {
    const { attr, className = 'form__input', name, type, placeholder, value, validate = [], methods = {} } = props

    if (validate.length > 0) {
      Object.assign(methods, {
        focus: () => {
          this._validateBlock()
        },
        blur: () => {
          this._validateBlock(false)
        }
      })
    }

    Object.assign(props, {
      attr: { className, name, type, placeholder, value, ...attr },
      methods,
      validate
    });
    
    return { template, props }
  }

  _validateBlock(needReport: boolean = true) {
    const target = (this._element as HTMLInputElement);
    if (typeof target !== 'undefined') {
      const { validate = [] } = this.props
      const validMessage = validator._exec(validate, target.value, true);
      if (validMessage === true) {
        target.setCustomValidity('');
      } else if (typeof validMessage === 'string') {
        target.setCustomValidity(validMessage);
        if (needReport) {
          target.reportValidity();
        }
      }
    }
  }

}
