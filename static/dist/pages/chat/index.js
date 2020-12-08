import { Chat } from './../../components/Chat/Chat.js';
import { renderDOM } from './../../utils/renderDOM.js';
import { chatList, chatContentData } from './data.js';
var chatListContent = new Chat({
    className: 'chat',
    listClassName: 'chat__list',
    listItemClassName: 'chat__list-item',
    activeListItemClassName: 'chat__list-item_active',
    selfmsg: 'Вы: ',
    chatList: chatList,
    chatContentData: chatContentData
});
renderDOM('.root', chatListContent, 'Чат');
//# sourceMappingURL=index.js.map