import { Block, BlockPropsMethods } from './../../../utils/Block.js';
import { default as chatContentTemplate } from './Chat__content.html.js';
import { Chat__message, ChatMessageProps } from './../Chat__message/Chat__message.js';
import { Custom } from './../../../blocks/Custom/Custom.js';
import { Dropdown } from './../../../blocks/Dropdown/Dropdown.js';
import { Form } from './../../../blocks/Form/Form.js';
import { Button, ButtonProps } from './../../../blocks/Button/Button.js';
import { Input } from './../../../blocks/Input/Input.js';
import { Modal } from './../../../blocks/Modal/Modal.js';

export interface ChatContentProps {
  className?: string;
  methods?: BlockPropsMethods;
  title?: string;
  avatar?: string;
  messageList?: ChatMessageProps[];
}

export class Chat__content extends Block {
  constructor(props: ChatContentProps = {}) {
    super('main', props);
  }
  render(template: string, props: ChatContentProps) {
    const { className = 'chat__right', title, avatar, messageList, methods } = props
    if (typeof title === 'undefined' && typeof avatar === 'undefined' && typeof messageList === 'undefined') {
      template = '<p class="chat__default-message">Чтобы отправить сообщение выберите чат</p>'
    } else {
      template = chatContentTemplate
    }
    const headerDrpdownButtonTemplate = `<svg width="3" height="15" viewBox="0 0 3 15" fill="#757575" xmlns="http://www.w3.org/2000/svg">
<path d="M3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5Z" />
<path d="M3 13.5C3 14.3284 2.32843 15 1.5 15C0.671573 15 0 14.3284 0 13.5C0 12.6716 0.671573 12 1.5 12C2.32843 12 3 12.6716 3 13.5Z" />
<path d="M3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 6C2.32843 6 3 6.67157 3 7.5Z" />
</svg>`;
    const addUserInput = new Input({ 
      name: 'login', type: 'text', placeholder: 'Логин', 
      validate: [{ type: 'notEmpty', msg: 'Поле не должно быть пустым' }]
    });
    const addUserButton = new Button({
      className: ['button', 'button_primary', 'button_fullwidth', 'mt20'].join(' '), type: 'submit', content: 'Добавить'
    });
    const addUserModal = new Modal({
      header: 'Добавить пользователя',
      modalContent: new Form({ attr: { className: 'form', method: 'POST' }, content: [ addUserInput, addUserButton ] })
    });
    const delUserInput = new Input({ 
      name: 'login', type: 'text', placeholder: 'Логин', 
      validate: [{ type: 'notEmpty', msg: 'Поле не должно быть пустым' }]
    });
    const delUserButton = new Button({
      className: ['button', 'button_warning', 'button_fullwidth', 'mt20'].join(' '), type: 'submit', content: 'Удалить'
    });
    const delUserModal = new Modal({
      header: 'Удалить пользователя',
      modalContent: new Form({ attr: { className: 'form', method: 'POST' }, content: [ delUserInput, delUserButton ] })
    });
    const delChatModal = new Modal({
      header: 'Удалить чат',
      modalContent: new Form(
        { 
          attr: { className: 'form', method: 'POST' }, 
          content: [ 
            new Custom({
              tagName: 'p',
              attr: { className: 'form__text' },
              content: 'Вы уверены, что желаете удалить текущий чат?'
            }),
            new Custom({
              attr: { className: 'form__group form__group_flex' },
              content: [
                new Button({
                  className: 'button button_gray',
                  type: 'button', 
                  content: 'Нет, я передумал',
                  methods: { 
                    click: () => {
                      delChatModal.hide()
                    }
                  }
                }),
                new Button({
                  className: 'button button_warning',
                  type: 'submit', 
                  content: 'Да!'
                })
              ]
            })
          ]
        }
      )
    });
    const headerDrpdownButtonsList: ButtonProps[] = [
      {
        className: 'dropdown__list-button',
        _template: `<span><i class="icon-button icon-button_add-user"></i>{{text}}</span>`,
        text: 'Добавить пользователя',
        type: 'button',
        methods: { click: () => addUserModal.show() }
      },
      {
        className: 'dropdown__list-button',
        _template: `<span><i class="icon-button icon-button_delete-user"></i>{{text}}</span>`,
        text: 'Удалить пользователя',
        type: 'button',
        methods: { click: () => delUserModal.show() }
      },
      {
        className: 'dropdown__list-button',
        _template: `<span><i class="icon-button icon-button_delete-chat"></i>{{text}}</span>`,
        text: 'Удалить чат',
        type: 'button',
        methods: { click: () => delChatModal.show() }
      }
    ];
    const headerDrpdownButtonsListBlocks = headerDrpdownButtonsList.map((button) => new Button({ ...button }));
    const dropdownHeader = new Dropdown({
      className: ['dropdown', 'bottom_right'].join(' '),
      buttonClasses: ['button-round', 'button-round_transparent', 'chat__header-button'],
      buttonTemplate: headerDrpdownButtonTemplate,
      listContent: headerDrpdownButtonsListBlocks
    });
    const bottomDrpdownButtonsList: ButtonProps[] = [
      {
        className: 'dropdown__list-button',
        _template: `<span><i class="icon-button icon-button_media"></i>{{text}}</span>`,
        text: 'Фото и Видео',
        type: 'button'
      },
      {
        className: 'dropdown__list-button',
        _template: `<span><i class="icon-button icon-button_file"></i>{{text}}</span>`,
        text: 'Файл',
        type: 'button'
      },
      {
        className: 'dropdown__list-button',
        _template: `<span><i class="icon-button icon-button_location"></i>{{text}}</span>`,
        text: 'Локация',
        type: 'button'
      }
    ];
    const bottomDrpdownButtonsListBlocks = bottomDrpdownButtonsList.map((button) => new Button({ ...button }));
    const dropdownBottom = new Dropdown({
      className: ['dropdown', 'top_left'].join(' '),
      buttonClasses: ['chat__message-attach'],
      buttonTemplate: `<i class="fa fa-paperclip"></i>`,
      listContent: bottomDrpdownButtonsListBlocks
    });
    const bottomInput = new Input({
      className: 'chat__message-text',
      name: 'message',
      type: 'text',
      placeholder: 'Сообщение'
    });
    const bottomButton = new Button({
      type: 'button',
      className: 'button-round button-round_primary chat__message-send',
      _template: '<i class="fa fa-arrow-right"></i>'
    });
    const sendForm = new Form({
      attr: {
        className: 'chat__message',
        method: 'POST'
      },
      content: [
        dropdownBottom,
        bottomInput,
        bottomButton
      ]
    })
    Object.assign(props, {
      attr: { className },
      methods, title, avatar, 
      messageList: this._prepareMessageList(messageList),
      dropdownHeader,
      sendForm
    });
    return { template, props }
  }
  _prepareMessageList(messageList?: ChatMessageProps[]): Block | undefined {
    if (typeof messageList === 'undefined') {
      return undefined
    }
    const messageListBlocks = messageList.map((message) => {
      return new Chat__message(message)
    })
    return new Custom({
      tagName: 'ul',
      attr: {
        className: 'chat__body'
      },
      content: (messageListBlocks as Block[])
    })
  }
}

