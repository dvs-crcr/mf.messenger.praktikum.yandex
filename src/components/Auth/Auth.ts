import { Block } from './../../utils/Block.js';
import {default as authTemplate} from './Auth.html.js';

export class Auth extends Block {

  constructor(props: {}) {
    Object.assign(props, {
      _template: authTemplate
    })
    super('div', props);
  }

}
