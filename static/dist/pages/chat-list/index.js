import { Chat } from './../../components/Chat/Chat.js';
import { renderDOM } from './../../utils/renderDOM.js';
import { chatList } from './../chat/data.js';
const activeItemClass = 'chat__list-item_active';
const chatListContent = new Chat({
    className: 'chat',
    listClassName: 'chat__list',
    listItemClassName: 'chat__list-item',
    activeListItemClassName: activeItemClass,
    selfmsg: 'Вы: ',
    chatList,
    itemMethods: {
        click: function () {
            if (typeof this !== 'undefined') {
                this.classList.toggle(activeItemClass);
            }
        }
    }
});
renderDOM('.root', chatListContent, 'Список чатов');
//# sourceMappingURL=index.js.map