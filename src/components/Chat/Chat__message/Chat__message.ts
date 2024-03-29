import { Block, BlockPropsMethods } from './../../../utils/Block.js';
import { chatMessageDateTemplate, chatMessageImageTemplate, chatMessageTextTemplate } from './Chat__message.html.js';
import { Custom } from './../../../blocks/Custom/Custom.js';

export interface ChatMessageProps {
  className?: string;
  methods?: BlockPropsMethods;
  isSelf?: boolean;
  type?: 'date' | 'text' | 'image';
  msgContent?: string | Block;
  time?: string; 
  status?: 'delivered' | 'unread' | 'read';
}

export class Chat__message extends Block {

  constructor(props: ChatMessageProps = {}) {
    super('li', props);
  }

  render(template: string, props: ChatMessageProps) {
    const { className, methods, isSelf, type, msgContent, time, status } = props;
    const classes = [];
    if (typeof className !== 'undefined') {
      classes.push(className);
    }

    let msgStatus;
    if (typeof type !== 'undefined') {
      if ( type === 'date' ) {
        template = chatMessageDateTemplate;
        classes.push('chat__body-date');
      }
      if ( type === 'text' ) {
        template = chatMessageTextTemplate;
        classes.push('chat__body-message');
      }
      if ( type === 'image' ) {
        template = chatMessageImageTemplate;
        classes.push('chat__body-message');
        classes.push('chat__body-message_image');
      }
      if (isSelf === true) {
        classes.push('chat__body-message_self');
        if (status === 'read') {
          classes.push('chat__body-message_read');
          msgStatus = new Custom('div', {
            attr: {
              className: 'chat__body-message-status'
            },
            _template: '<div class=""><i class="fa fa-check"></i></div>'
          });
        }
      }

    }

    Object.assign(props, {
      attr: {
        className: classes.join(' ')
      },
      methods, isSelf, type, msgContent, time, status, msgStatus
    })

    return { template, props }
  }

}