import { Chat } from './../../components/Chat/Chat.js';
import { renderDOM } from './../../utils/renderDOM.js';
import { chatList } from './../chat/data.js';
var activeItemClass = 'chat__list-item_active';
var chatListContent = new Chat({
    className: 'chat',
    listClassName: 'chat__list',
    listItemClassName: 'chat__list-item',
    activeListItemClassName: activeItemClass,
    selfmsg: 'Вы: ',
    chatList: chatList,
    itemMethods: {
        click: function () {
            if (typeof this !== 'undefined') {
                this.classList.toggle(activeItemClass);
                window.location.href = '/chat.html';
            }
        }
    }
});
renderDOM('.root', chatListContent, 'Список чатов');
//# sourceMappingURL=index.js.map