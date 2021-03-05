import { Block, BlockPropsMethods } from './../../../utils/Block.js';
import { default as chatListTemplate } from './Chat__list.html.js';

export interface ChatPropsList {
  id?: number;
  attr?: {
    className?: string;
  },
  activeClass?: string;
  isActive?: boolean; 
  isSelf?: boolean; 
  title?: string;
  selfmsg?: string;
  lastmsg?: string;
  time?: string;
  count?: string;
  avatar?: string;
  methods?: BlockPropsMethods;
}
export class Chat__list extends Block {

  constructor(props: ChatPropsList = {}) {
    super('li', props, chatListTemplate);
  }

  render(template: string, props: ChatPropsList) {
    const { attr, isActive, activeClass, isSelf, selfmsg, title, lastmsg, avatar } = props
    
    let className = '';
    if (typeof attr !== 'undefined') {
      if (typeof attr.className !== 'undefined') {
        className = attr.className
      }
    }
    let addclass = ''
    if (isActive === true && typeof activeClass !== 'undefined') {
      addclass = activeClass
    }

    let selfMsgLen = 50;
    if (isSelf === true && typeof selfmsg !== 'undefined') {
      selfMsgLen -= selfmsg.length
    }

    Object.assign(props, {
      attr: {
        className: `${className} ${addclass}`
      },
      avatar: avatar ?? '/assets/img/avatar_50x50.png',
      selfmsg: isSelf ? selfmsg : '',
      title: this._substr(title, 21),
      lastmsg: this._substr(lastmsg, selfMsgLen)
    })
    return { template, props }
  }

  _substr(str: string | undefined, len: number, add: string = '…') {
    if (typeof str === 'undefined') {
      return undefined
    }
    if (str.length > len) {
      return str.trim().substring(0, len).concat(add);
    }
    return str;
  }



}
