import { Chat } from './../../components/Chat/Chat.js';
import { renderDOM } from './../../utils/renderDOM.js';
import { Custom } from './../../blocks/Custom/Custom.js';
import { Data } from './data.js';
const chatContent = new Custom('p', {
    attr: {
        className: 'chat__default-message'
    },
    content: 'Чтобы отправить сообщение выберите чат'
});
const activeItemClass = 'chat__list-item_active';
const chatListContent = new Chat({
    className: 'chat',
    listClassName: 'chat__list',
    listItemClassName: 'chat__list-item',
    activeListItemClassName: activeItemClass,
    selfmsg: 'Вы: ',
    chatList: Data,
    chatContent,
    itemMethods: {
        click: function () {
            if (typeof this !== 'undefined') {
                this.classList.toggle(activeItemClass);
            }
        }
    }
});
renderDOM('.root', chatListContent, 'Чат');
//# sourceMappingURL=index.js.map