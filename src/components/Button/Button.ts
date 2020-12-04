import { Block } from './../../utils/Block.js';
import {default as buttonTemplate} from './Button.html.js';

export class Button extends Block {

  constructor(props: {}) {
    Object.assign(props, {
      _template: buttonTemplate
    })
    super('button', props);
  }

}