import { Block } from './../../utils/Block.js';
import { default as chatTemplate } from './Chat.html.js';
import { Chat__list } from './Chat__list/Chat__list.js';
import { Custom } from './../../blocks/Custom/Custom.js';
;
export class Chat extends Block {
    constructor(props = {}) {
        super('div', props, chatTemplate);
    }
    render(template, props) {
        const { className, listClassName, listItemClassName, activeListItemClassName, selfmsg, itemMethods, chatList, chatContent, methods } = props;
        const chatListItems = chatList === null || chatList === void 0 ? void 0 : chatList.map((itemProps) => {
            Object.assign(itemProps, {
                attr: {
                    className: listItemClassName
                },
                activeClass: activeListItemClassName,
                selfmsg,
                methods: itemMethods
            });
            return new Chat__list(itemProps);
        });
        window['chatitems'] = chatListItems;
        const chatListContent = new Custom('ul', {
            attr: {
                className: listClassName
            },
            content: chatListItems
        });
        Object.assign(props, {
            attr: { className },
            chatListContent,
            chatList,
            chatContent,
            methods
        });
        return { template, props };
    }
}
//# sourceMappingURL=Chat.js.map