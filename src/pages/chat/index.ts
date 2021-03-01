import { Chat } from './../../components/Chat/Chat.js';
import { chatList, chatContentData } from './index.data.js'

const chatListContent = new Chat({
  className: 'chat',
  listClassName: 'chat__list',
  listItemClassName: 'chat__list-item',
  activeListItemClassName: 'chat__list-item_active',
  selfmsg: 'Вы: ',
  chatList,
  chatContentData
})

export default chatListContent;