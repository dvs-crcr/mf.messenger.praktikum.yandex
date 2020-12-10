export interface ValidateListInterface {
  type: 'notEmpty' | 'isEmpty' | 'isAlpha' | 'isRussianAlpha' | 'isEmail' | 'isPhone' | 'isInputValueEqual';
  options?: object;
  msg?: string;
}

class Validator {

  _exec(list: ValidateListInterface[], target: string, returnMessage: boolean = false): boolean | string {
    try {
      list.forEach((item: ValidateListInterface) => {
        if (!item.type.startsWith('_')) {
          let fn = (this as any)[item.type];
          if (typeof fn === 'function') {
            if (fn(target, item.options) === false) {
              throw item.msg;
            }
          }
        }
      })
    } catch (error) {
      if (returnMessage) {
        return error
      } else {
        return false
      }
    }
    return true
  }

  notEmpty(target: string) {
    return target.trim().length !== 0;
  }

  isEmpty(target: string) {
    return !this.notEmpty(target);
  }

  isAlpha(target: string) {
    return /^[A-Z]+$/i.test(target);
  }

  isRussianAlpha(target: string) {
    return /^[А-ЯЁ]+$/i.test(target);
  }

  isEmail(target: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(target);
  }

  isPhone(target: string) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i;
    return re.test(target);
  }

  isInputValueEqual(target: string, options: {selector: string}) {
    const { selector } = options;
    if (typeof selector === 'undefined') {
      return false
    }
    if (typeof document.querySelector(selector) === 'undefined') {
      return false
    }
    return (document.querySelector(selector) as HTMLInputElement).value === target;
  }

}

export const validator = new Validator();