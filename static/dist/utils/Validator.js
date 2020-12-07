class Validator {
    _exec(list, target, returnMessage = false) {
        try {
            list.forEach((item) => {
                if (!item.type.startsWith('_')) {
                    let fn = this[item.type];
                    if (typeof fn === 'function') {
                        if (fn(target, item.options) === false) {
                            throw item.msg;
                        }
                    }
                }
            });
        }
        catch (error) {
            if (returnMessage) {
                return error;
            }
            else {
                return false;
            }
        }
        return true;
    }
    notEmpty(target) {
        return target.trim().length === 0 ? false : true;
    }
    isEmpty(target) {
        return !this.notEmpty(target);
    }
    isAlpha(target) {
        return /^[A-Z]+$/i.test(target);
    }
    isRussianAlpha(target) {
        return /^[А-ЯЁ]+$/i.test(target);
    }
    isEmail(target) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(target);
    }
    isPhone(target) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i;
        return re.test(target);
    }
    isInputValueEqual(target, options) {
        const { selector } = options;
        if (typeof selector === 'undefined') {
            return false;
        }
        return document.querySelector(selector).value === target;
    }
}
export const validator = new Validator();
//# sourceMappingURL=Validator.js.map