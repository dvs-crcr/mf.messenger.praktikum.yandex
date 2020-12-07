import { Block, BlockPropsMethods } from './../../utils/Block.js';

type FormProps = {
  attr?: {
    className?: string;
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
    action?: string;
  };
  methods?: BlockPropsMethods;
  content?: Block[]
}
export class Form extends Block {

  constructor(props: FormProps = {}) {
    super('form', props);
  }

}
