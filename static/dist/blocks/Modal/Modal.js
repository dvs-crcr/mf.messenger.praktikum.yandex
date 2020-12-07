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
        if (props === void 0) { props = {}; }
        return _super.call(this, 'div', props, modalTemplate) || this;
    }
    Modal.prototype.render = function (template, props) {
        var id = props.id, _a = props.className, className = _a === void 0 ? 'modal' : _a, header = props.header, modalContent = props.modalContent, methods = props.methods;
        Object.assign(methods, {
            click: function (event) {
                if (event.target === event.currentTarget) {
                    event.target.classList.remove('modal_open');
                }
            }
        });
        Object.assign(props, {
            attr: { id: id, className: className },
            methods: methods,
            header: header,
            modalContent: modalContent
        });
        return { template: template, props: props };
    };
    return Modal;
}(Block));
export { Modal };
//# sourceMappingURL=Modal.js.map