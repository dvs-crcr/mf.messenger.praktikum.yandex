import { Chat } from './../../components/Chat/Chat.js';
import { renderDOM } from './../../utils/renderDOM.js';

import { chatList, chatContentData } from './data.js'

const activeItemClass = 'chat__list-item_active';

const chatListContent = new Chat({
  className: 'chat',
  listClassName: 'chat__list',
  listItemClassName: 'chat__list-item',
  activeListItemClassName: activeItemClass,
  selfmsg: 'Вы: ',
  chatList,
  chatContentData,
  itemMethods: {
    click: function() {
      if (typeof this !== 'undefined') {
        (this as any).classList.toggle(activeItemClass);
      }
    }
  }
})

renderDOM('.root', chatListContent, 'Чат')