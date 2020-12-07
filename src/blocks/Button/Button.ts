import { Block, BlockPropsMethods } from './../../utils/Block.js';

type ButtonProps = {
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  value?: string;
  methods?: BlockPropsMethods;
  _template?: string;
  content?: Block[] | string;
}
export class Button extends Block {

  constructor(props: ButtonProps = {}) {
    super('button', props);
  }

  render(template: string, props: ButtonProps) {
    const { className, type, value, methods = {}, _template } = props

    if (typeof _template !== 'undefined') {
      template = _template
    }

    Object.assign(props, {
      attr: { className, type, value },
      methods
    });
    
    return { template, props }
  }


}