import { Block, BlockPropsMethods } from './../../utils/Block.js';
import { default as chatTemplate } from './Chat.html.js';
import { Chat__list, ChatPropsList } from './Chat__list/Chat__list.js'
import { Custom } from './../../blocks/Custom/Custom.js';
import { Chat__content } from './Chat__content/Chat__content.js'

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
}

export class Chat extends Block {

  constructor(props: ChatProps = {}) {
    super('div', props, chatTemplate);
  }

  render(template: string, props: ChatProps) {
    const { className, listClassName, listItemClassName, activeListItemClassName, selfmsg, itemMethods, chatList, chatContentData, methods } = props
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

    const chatListContent = new Custom('ul', {
      attr: {
        className: listClassName
      },
      content: chatListItems
    });

    const chatContent = new Chat__content(chatContentData);

    Object.assign(props, {
      attr: { className },
      chatListContent,
      chatList, 
      chatContent,
      methods
    });
    return { template, props }
  }

}
