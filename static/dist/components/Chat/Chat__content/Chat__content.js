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
import { default as chatContentTemplate } from './Chat__content.html.js';
import { Chat__message } from './../Chat__message/Chat__message.js';
import { Custom } from './../../../blocks/Custom/Custom.js';
var Chat__content = /** @class */ (function (_super) {
    __extends(Chat__content, _super);
    function Chat__content(props) {
        if (props === void 0) { props = {}; }
        return _super.call(this, 'main', props) || this;
    }
    Chat__content.prototype.render = function (template, props) {
        var _a = props.className, className = _a === void 0 ? 'chat__right' : _a, title = props.title, avatar = props.avatar, messageList = props.messageList, methods = props.methods;
        if (typeof title === 'undefined' && typeof avatar === 'undefined' && typeof messageList === 'undefined') {
            template = '<p class="chat__default-message">Чтобы отправить сообщение выберите чат</p>';
        }
        else {
            template = chatContentTemplate;
        }
        Object.assign(props, {
            attr: { className: className },
            methods: methods, title: title, avatar: avatar,
            messageList: this._prepareMessageList(messageList)
        });
        return { template: template, props: props };
    };
    Chat__content.prototype._prepareMessageList = function (messageList) {
        if (typeof messageList === 'undefined') {
            return undefined;
        }
        var messageListBlocks = messageList.map(function (message) {
            return new Chat__message(message);
        });
        return new Custom('ul', {
            attr: {
                className: 'chat__body'
            },
            content: messageListBlocks
        });
    };
    return Chat__content;
}(Block));
export { Chat__content };
//# sourceMappingURL=Chat__content.js.map