import { Block, BlockPropsMethods } from './../../utils/Block.js';
import { default as chatTemplate } from './Chat.html.js';
import { Chat__list, ChatPropsList } from './Chat__list/Chat__list.js'
import { Custom } from './../../blocks/Custom/Custom.js';
import { Chat__content } from './Chat__content/Chat__content.js'
import { Form } from './../../blocks/Form/Form.js';
import { Button } from './../../blocks/Button/Button.js';
import { Input } from './../../blocks/Input/Input.js';
import { Modal } from './../../blocks/Modal/Modal.js';

export interface ChatPropsListExported extends ChatPropsList {};

export type ChatProps = {
  className?: string;
  listClassName?: string;
  listItemClassName?: string;
  activeListItemClassName?: string;
  selfmsg?: string;
  itemMethods?: BlockPropsMethods; 
  methods?: BlockPropsMethods;
  chatList?: ChatPropsList[];
  chatContentData?: object;
  addChatHandler?: Function;
  addUserToChatHandler?: Function;
  deleteUserFromChatHandler?: Function;
}

export class Chat extends Block {

  constructor(props: ChatProps = {}) {
    super('div', props, chatTemplate);
  }

  render(template: string, props: ChatProps) {
    const { className, listClassName, listItemClassName, activeListItemClassName, selfmsg, itemMethods, chatList, deleteUserFromChatHandler, addUserToChatHandler, addChatHandler, chatContentData, methods } = props
    const chatListItems = chatList?.map((itemProps: ChatPropsList) => {
      Object.assign(itemProps, {
        attr: {
          className: listItemClassName
        },
        activeClass: activeListItemClassName,
        selfmsg,
        methods: itemMethods
      })
      return new Chat__list(itemProps);
    });

    const chatListContent = new Custom({
      tagName: 'ul',
      attr: {
        className: listClassName
      },
      content: chatListItems
    });
    const chatModals = new Custom({
      content: ''
    });
    const addChatModal = this._addChatModal(chatModals, addChatHandler);
    const addChatButton = new Custom({
      attr: {
        className: 'chat__add-chat'
      },
      methods: {
        click: () => {
          addChatModal.show();
        }
      },
      content: 'Добавить чат'
    });

    const chatContent = new Chat__content({...chatContentData, modal_context: chatModals, addUserToChatHandler, deleteUserFromChatHandler});

    Object.assign(props, {
      attr: { className },
      addChatButton,
      chatListContent,
      chatList, 
      chatContent,
      chatModals,
      methods
    });
    return { template, props }
  }

  _addChatModal(modal_context: Block, addChatHandler?: Function) {
    const addChatInput = new Input({
      name: 'title', type: 'text', placeholder: 'Название чата',
      validate: [{ type: 'notEmpty', msg: 'Поле не должно быть пустым' }]
    });
    const addChatButton = new Button({
      className: ['button', 'button_primary', 'button_fullwidth', 'mt20'].join(' '), type: 'submit', content: 'Добавить',
      methods: {
        click: () => {
          if (addChatHandler) addChatHandler(addChatInput, modal);
        }
      }
    });
    const modal = new Modal({
      caller_context: modal_context,
      header: 'Добавить Чат',
      modalContent: new Form({ attr: { className: 'form', method: 'POST' }, content: [ addChatInput, addChatButton ] })
    });
    return modal;
  }

}
