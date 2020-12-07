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
import { default as chatTemplate } from './Chat.html.js';
import { Chat__list } from './Chat__list/Chat__list.js';
import { Custom } from './../../blocks/Custom/Custom.js';
import { Chat__content } from './Chat__content/Chat__content.js';
;
var Chat = /** @class */ (function (_super) {
    __extends(Chat, _super);
    function Chat(props) {
        if (props === void 0) { props = {}; }
        return _super.call(this, 'div', props, chatTemplate) || this;
    }
    Chat.prototype.render = function (template, props) {
        var className = props.className, listClassName = props.listClassName, listItemClassName = props.listItemClassName, activeListItemClassName = props.activeListItemClassName, selfmsg = props.selfmsg, itemMethods = props.itemMethods, chatList = props.chatList, chatContentData = props.chatContentData, methods = props.methods;
        var chatListItems = chatList === null || chatList === void 0 ? void 0 : chatList.map(function (itemProps) {
            Object.assign(itemProps, {
                attr: {
                    className: listItemClassName
                },
                activeClass: activeListItemClassName,
                selfmsg: selfmsg,
                methods: itemMethods
            });
            return new Chat__list(itemProps);
        });
        var chatListContent = new Custom('ul', {
            attr: {
                className: listClassName
            },
            content: chatListItems
        });
        var chatContent = new Chat__content(chatContentData);
        Object.assign(props, {
            attr: { className: className },
            chatListContent: chatListContent,
            chatList: chatList,
            chatContent: chatContent,
            methods: methods
        });
        return { template: template, props: props };
    };
    return Chat;
}(Block));
export { Chat };
//# sourceMappingURL=Chat.js.map