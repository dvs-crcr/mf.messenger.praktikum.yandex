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
import { Block } from './../../utils/Block.js';
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(props) {
        if (props === void 0) { props = {}; }
        return _super.call(this, 'button', props) || this;
    }
    Button.prototype.render = function (template, props) {
        var className = props.className, type = props.type, value = props.value, text = props.text, _a = props.methods, methods = _a === void 0 ? {} : _a, _template = props._template;
        if (typeof _template !== 'undefined') {
            template = _template;
        }
        Object.assign(props, {
            attr: { className: className, type: type, value: value },
            methods: methods,
            text: text
        });
        return { template: template, props: props };
    };
    return Button;
}(Block));
export { Button };
//# sourceMappingURL=Button.js.map