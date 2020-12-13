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
import { Block } from './../../../utils/Block.js';
import { default as chatContentTemplate } from './Chat__content.html.js';
import { Chat__message } from './../Chat__message/Chat__message.js';
import { Custom } from './../../../blocks/Custom/Custom.js';
import { Dropdown } from './../../../blocks/Dropdown/Dropdown.js';
import { Form } from './../../../blocks/Form/Form.js';
import { Button } from './../../../blocks/Button/Button.js';
import { Input } from './../../../blocks/Input/Input.js';
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
        var headerDrpdownButtonTemplate = "<svg width=\"3\" height=\"15\" viewBox=\"0 0 3 15\" fill=\"#757575\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5Z\" />\n<path d=\"M3 13.5C3 14.3284 2.32843 15 1.5 15C0.671573 15 0 14.3284 0 13.5C0 12.6716 0.671573 12 1.5 12C2.32843 12 3 12.6716 3 13.5Z\" />\n<path d=\"M3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 6C2.32843 6 3 6.67157 3 7.5Z\" />\n</svg>";
        var headerDrpdownButtonsList = [
            {
                className: 'dropdown__list-button',
                _template: "<span><i class=\"icon-button icon-button_add-user\"></i>{{text}}</span>",
                text: 'Добавить пользователя',
                type: 'button'
            },
            {
                className: 'dropdown__list-button',
                _template: "<span><i class=\"icon-button icon-button_delete-user\"></i>{{text}}</span>",
                text: 'Удалить пользователя',
                type: 'button'
            },
            {
                className: 'dropdown__list-button',
                _template: "<span><i class=\"icon-button icon-button_delete-chat\"></i>{{text}}</span>",
                text: 'Удалить чат',
                type: 'button'
            }
        ];
        var headerDrpdownButtonsListBlocks = headerDrpdownButtonsList.map(function (button) { return new Button(__assign({}, button)); });
        var dropdownHeader = new Dropdown({
            className: ['dropdown', 'bottom_right'].join(' '),
            buttonClasses: ['button-round', 'button-round_transparent', 'chat__header-button'],
            buttonTemplate: headerDrpdownButtonTemplate,
            listContent: headerDrpdownButtonsListBlocks
        });
        var bottomDrpdownButtonsList = [
            {
                className: 'dropdown__list-button',
                _template: "<span><i class=\"icon-button icon-button_media\"></i>{{text}}</span>",
                text: 'Фото и Видео',
                type: 'button'
            },
            {
                className: 'dropdown__list-button',
                _template: "<span><i class=\"icon-button icon-button_file\"></i>{{text}}</span>",
                text: 'Файл',
                type: 'button'
            },
            {
                className: 'dropdown__list-button',
                _template: "<span><i class=\"icon-button icon-button_location\"></i>{{text}}</span>",
                text: 'Локация',
                type: 'button'
            }
        ];
        var bottomDrpdownButtonsListBlocks = bottomDrpdownButtonsList.map(function (button) { return new Button(__assign({}, button)); });
        var dropdownBottom = new Dropdown({
            className: ['dropdown', 'top_left'].join(' '),
            buttonClasses: ['chat__message-attach'],
            buttonTemplate: "<i class=\"fa fa-paperclip\"></i>",
            listContent: bottomDrpdownButtonsListBlocks
        });
        var bottomInput = new Input({
            className: 'chat__message-text',
            name: 'message',
            type: 'text',
            placeholder: 'Сообщение'
        });
        var bottomButton = new Button({
            type: 'button',
            className: 'button-round button-round_primary chat__message-send',
            _template: '<i class="fa fa-arrow-right"></i>'
        });
        var sendForm = new Form({
            attr: {
                className: 'chat__message',
                method: 'POST'
            },
            content: [
                dropdownBottom,
                bottomInput,
                bottomButton
            ]
        });
        Object.assign(props, {
            attr: { className: className },
            methods: methods, title: title, avatar: avatar,
            messageList: this._prepareMessageList(messageList),
            dropdownHeader: dropdownHeader,
            sendForm: sendForm
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