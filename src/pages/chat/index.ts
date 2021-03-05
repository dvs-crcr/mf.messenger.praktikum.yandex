import { Chat } from './../../components/Chat/Chat.js';
import { Block } from './../../utils/Block.js';
import { ChatApi } from './../../components/Chat/Chat.api.js';
import { chatList, chatContentData } from './../chat/index.data.js'
import { Modal } from './../../blocks/Modal/Modal.js';

import { Page } from './../../utils/Page.js';

class ChatPage extends Page {
  _activeItemClass = 'chat__list-item_active';
  _page: Chat;
  _api: ChatApi;

  constructor() {
    super();
    this._api = new ChatApi();
    this._page = new Chat({
      className: 'chat',
      listClassName: 'chat__list',
      listItemClassName: 'chat__list-item',
      activeListItemClassName: this._activeItemClass,
      selfmsg: 'Вы: ',
      chatList,
      chatContentData,
      addChatHandler: this.addChatHandler,
      addUserToChatHandler: this.addUserToChatHandler,
      deleteUserFromChatHandler: this.deleteUserFromChatHandler,
      itemMethods: {
        click: this.chatClickHandler.bind(this, this._activeItemClass)
      }
    });
    this.init();
  }

  addChatHandler = async (input: Block, modal: Modal) => {
    const title = (input._element as HTMLInputElement).value;
    await this._api.createChat({title});
    modal.hide();
    await this._loadChatList();
  }

  addUserToChatHandler = async (userIdInput: Block, chatIdInput: Block, modal: Modal) => {
    const userId = (userIdInput._element as HTMLInputElement).value;
    const chatId = (chatIdInput._element as HTMLInputElement).value;
    await this._api.addUsersToChat({
      users: [parseInt(userId, 10)],
      chatId: parseInt(chatId, 10),
    });
    modal.hide();
  }

  deleteUserFromChatHandler = async (userIdInput: Block, chatIdInput: Block, modal: Modal) => {
    const userId = (userIdInput._element as HTMLInputElement).value;
    const chatId = (chatIdInput._element as HTMLInputElement).value;
    await this._api.deleteUsersFromChat({
      users: [parseInt(userId, 10)],
      chatId: parseInt(chatId, 10),
    });
    modal.hide();
  }

  init = async () => {
    await this._loadChatList();
  }

  _loadChatList = async () => {
    const chatList = await this._api.getChats()
    this._page.setProps({chatList})
  }

  chatClickHandler(toggleClass: string) {
    if (typeof this !== 'undefined') {
      (this as any).classList.toggle(toggleClass);
      window.location.href = '/chat.html';
    }
  }

  render() {
    return this._page
  }
}

export default ChatPage;
