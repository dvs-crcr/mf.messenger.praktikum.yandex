import { Block } from './../../utils/Block.js'
import { template } from './Button.html.js'

export class Button extends Block {

  constructor(props: {}, _needRender: boolean = false) {
    super('button', props, template, _needRender)
  }

}