// type ValidatorTargetType = string | object
export interface ValidateListInterface {
  type: string;
  options?: object | undefined;
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
    return target.trim().length === 0 ? false : true;
  }

  isEmpty(target: string) {
    return !this.notEmpty(target);
  }

  isAlpha(target: string) {
    return /^[A-Z]+$/i.test(target);
  }
}

export const validator = new Validator();