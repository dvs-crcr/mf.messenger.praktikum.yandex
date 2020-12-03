import { Block } from './../../utils/Block.js';
import { template } from './Auth.html.js'

export class Auth extends Block {

  constructor(props: {}, _needRender: boolean = false) {
    super('Auth', props, template, _needRender);
  }

}
