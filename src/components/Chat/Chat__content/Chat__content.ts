import { Block, BlockPropsMethods } from './../../../utils/Block.js';
import { default as chatContentTemplate } from './Chat__content.html.js';
import { Chat__message, ChatMessageProps } from './../Chat__message/Chat__message.js';
import { Custom } from './../../../blocks/Custom/Custom.js';

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

    Object.assign(props, {
      attr: { className },
      methods, title, avatar, 
      messageList: this._prepareMessageList(messageList)
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

    return new Custom('ul', {
      attr: {
        className: 'chat__body'
      },
      content: (messageListBlocks as Block[])
    })
  }



}

