import { Block, BlockPropsMethods } from './../../utils/Block.js';

type ButtonProps = {
  attr?: {
    className?: string;
    type?: 'submit' | 'reset' | 'button';
    value?: string;
  };
  methods?: BlockPropsMethods;
}
export class Button extends Block {

  constructor(props: ButtonProps = {}) {
    super('input', props);
  }


}