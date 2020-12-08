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
import { Block } from './../../../utils/Block.js';
import { chatMessageDateTemplate, chatMessageImageTemplate, chatMessageTextTemplate } from './Chat__message.html.js';
import { Custom } from './../../../blocks/Custom/Custom.js';
var Chat__message = /** @class */ (function (_super) {
    __extends(Chat__message, _super);
    function Chat__message(props) {
        if (props === void 0) { props = {}; }
        return _super.call(this, 'li', props) || this;
    }
    Chat__message.prototype.render = function (template, props) {
        var className = props.className, methods = props.methods, isSelf = props.isSelf, type = props.type, msgContent = props.msgContent, time = props.time, status = props.status;
        var classes = [];
        if (typeof className !== 'undefined') {
            classes.push(className);
        }
        var msgStatus;
        if (typeof type !== 'undefined') {
            if (type === 'date') {
                template = chatMessageDateTemplate;
                classes.push('chat__body-date');
            }
            if (type === 'text') {
                template = chatMessageTextTemplate;
                classes.push('chat__body-message');
            }
            if (type === 'image') {
                template = chatMessageImageTemplate;
                classes.push('chat__body-message');
                classes.push('chat__body-message_image');
            }
            if (isSelf === true) {
                classes.push('chat__body-message_self');
                if (status === 'read') {
                    classes.push('chat__body-message_read');
                    msgStatus = new Custom('div', {
                        attr: {
                            className: 'chat__body-message-status'
                        },
                        _template: '<div class=""><i class="fa fa-check"></i></div>'
                    });
                }
            }
        }
        Object.assign(props, {
            attr: {
                className: classes.join(' ')
            },
            methods: methods, isSelf: isSelf, type: type, msgContent: msgContent, time: time, status: status, msgStatus: msgStatus
        });
        return { template: template, props: props };
    };
    return Chat__message;
}(Block));
export { Chat__message };
//# sourceMappingURL=Chat__message.js.map