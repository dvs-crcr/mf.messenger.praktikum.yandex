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
import { default as dropdownTemplate } from './Dropdown.html.js';
import { Custom } from './../../blocks/Custom/Custom.js';
import { Button } from './../../blocks/Button/Button.js';
var Dropdown = /** @class */ (function (_super) {
    __extends(Dropdown, _super);
    function Dropdown(props) {
        if (props === void 0) { props = {}; }
        return _super.call(this, 'div', props, dropdownTemplate) || this;
    }
    Dropdown.prototype.render = function (template, props) {
        var _this = this;
        var _a = props.className, className = _a === void 0 ? 'dropdown' : _a, buttonTemplate = props.buttonTemplate, _b = props.buttonClasses, buttonClasses = _b === void 0 ? [] : _b, listContent = props.listContent;
        var dropdownList = new Custom('div', {
            attr: { className: 'dropdown__list' },
            content: listContent
        });
        var dropdownButton = new Button({
            className: ['dropdown__toggle'].concat(buttonClasses).join(' '),
            _template: buttonTemplate,
            methods: {
                click: function (event) {
                    var _a;
                    event.preventDefault();
                    (_a = _this.getContent()) === null || _a === void 0 ? void 0 : _a.classList.toggle('dropdown_opened');
                }
            }
        });
        Object.assign(props, {
            attr: { className: className },
            dropdownButton: dropdownButton,
            dropdownList: dropdownList
        });
        return { template: template, props: props };
    };
    return Dropdown;
}(Block));
export { Dropdown };
//# sourceMappingURL=Dropdown.js.map