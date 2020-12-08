var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Использование расширения .js согласовано с наставником
import { Block } from './../../utils/Block.js';
import { validator } from './../../utils/Validator.js';
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input(props) {
        if (props === void 0) { props = {}; }
        return _super.call(this, 'input', props) || this;
    }
    Input.prototype.render = function (template, props) {
        var _this = this;
        var attr = props.attr, className = props.className, name = props.name, type = props.type, placeholder = props.placeholder, value = props.value, _a = props.validate, validate = _a === void 0 ? [] : _a, _b = props.methods, methods = _b === void 0 ? {} : _b;
        if (validate.length > 0) {
            Object.assign(methods, {
                focus: function () {
                    _this._validateBlock();
                },
                blur: function () {
                    _this._validateBlock(false);
                }
            });
        }
        Object.assign(props, {
            attr: __assign({ className: className, name: name, type: type, placeholder: placeholder, value: value }, attr),
            methods: methods,
            validate: validate
        });
        return { template: template, props: props };
    };
    Input.prototype._validateBlock = function (needReport) {
        if (needReport === void 0) { needReport = true; }
        var target = this._element;
        if (typeof target !== 'undefined') {
            var _a = this.props.validate, validate = _a === void 0 ? [] : _a;
            var validMessage = validator._exec(validate, target.value, true);
            if (validMessage === true) {
                target.setCustomValidity('');
            }
            else if (typeof validMessage === 'string') {
                target.setCustomValidity(validMessage);
                if (needReport) {
                    target.reportValidity();
                }
            }
        }
    };
    return Input;
}(Block));
export { Input };
//# sourceMappingURL=Input.js.map