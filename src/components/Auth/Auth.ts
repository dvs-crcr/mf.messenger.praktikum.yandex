import { Block } from './../../utils/Block.js'
import { template } from './Auth.html.js'

export class Auth extends Block {

  constructor(props: {}) {
    super('Auth', template, props)
    this.setProps(props)
  }

}
