import { Block, BlockPropsMethods } from './../../utils/Block.js';
import {default as authTemplate} from './Auth.html.js';
import { Custom } from './../../blocks/Custom/Custom.js';
import { Form } from './../../blocks/Form/Form.js'

type AuthProps = {
  attr?: {
    className?: string;
  };
  header?: string;
  error_line?: Block;
  methods?: BlockPropsMethods;
  form?: Form,
  link?: {
    href?: string,
    title?: string
  }
}
export class Auth extends Block {

  constructor(props: AuthProps = {}) {
    super('div', props, authTemplate);
  }

  render(template: string, props: AuthProps) {
    if (typeof props.link !== 'undefined') {
      const { href, title } = props.link;
      const linkBlock = new Custom({
        tagName: 'a',
        attr: {
          href: href,
          onclick: `window.router.go('${href}'); return false;`
        },
        content: title
      });
      Object.assign(props, {
        navlink: linkBlock
      });
    }
    return { template, props }
  }

}