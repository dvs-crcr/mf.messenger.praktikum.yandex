import { Block, BlockPropsMethods } from './../../utils/Block.js';
import {default as authTemplate} from './Auth.html.js';

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

}
