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
import { default as modalTemplate } from './Modal.html.js';
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal(props) {
        return _super.call(this, 'div', props, modalTemplate) || this;
    }
    Modal.prototype.render = function (template, props) {
        var _this = this;
        var _a = props.className, className = _a === void 0 ? 'modal hidden' : _a, header = props.header, modalContent = props.modalContent;
        var methods = {
            click: function (event) {
                event.preventDefault();
                if (event.target === event.currentTarget) {
                    _this.hide();
                }
            }
        };
        Object.assign(props, {
            attr: { className: className },
            methods: methods,
            header: header,
            modalContent: modalContent
        });
        this.insert();
        return { template: template, props: props };
    };
    Modal.prototype.insert = function () {
        var element = this.getContent();
        if (typeof element !== 'undefined') {
            document.body.insertAdjacentElement('beforeend', element);
        }
    };
    return Modal;
}(Block));
export { Modal };
//# sourceMappingURL=Modal.js.map