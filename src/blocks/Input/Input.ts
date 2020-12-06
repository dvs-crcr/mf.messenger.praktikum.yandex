import { Block, BlockPropsMethods } from './../../utils/Block.js';

interface InputProps {
  className?: string;
  name?: string;
  type?: 'text' | 'password' | string;
  placeholder?: string;
  value?: string;
  methods?: BlockPropsMethods;
}

export class Input extends Block {

  constructor(props: InputProps = {}) {
    super('input', props);
  }

  render(template: string, props: InputProps) {
    const { className, name, type, placeholder, value, methods } = props

    Object.assign(props, {
      attr: { className, name, type, placeholder, value },
      methods: methods
    });
    
    return { template, props }
  }

}
