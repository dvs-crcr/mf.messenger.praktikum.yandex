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
}
export const validator = new Validator();
//# sourceMappingURL=Validator.js.map