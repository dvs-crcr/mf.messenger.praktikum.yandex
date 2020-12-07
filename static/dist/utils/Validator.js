var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.prototype._exec = function (list, target, returnMessage) {
        var _this = this;
        if (returnMessage === void 0) { returnMessage = false; }
        try {
            list.forEach(function (item) {
                if (!item.type.startsWith('_')) {
                    var fn = _this[item.type];
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
    };
    Validator.prototype.notEmpty = function (target) {
        return target.trim().length === 0 ? false : true;
    };
    Validator.prototype.isEmpty = function (target) {
        return !this.notEmpty(target);
    };
    Validator.prototype.isAlpha = function (target) {
        return /^[A-Z]+$/i.test(target);
    };
    Validator.prototype.isRussianAlpha = function (target) {
        return /^[А-ЯЁ]+$/i.test(target);
    };
    Validator.prototype.isEmail = function (target) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(target);
    };
    Validator.prototype.isPhone = function (target) {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i;
        return re.test(target);
    };
    Validator.prototype.isInputValueEqual = function (target, options) {
        var selector = options.selector;
        if (typeof selector === 'undefined') {
            return false;
        }
        return document.querySelector(selector).value === target;
    };
    return Validator;
}());
export var validator = new Validator();
//# sourceMappingURL=Validator.js.map