import { Block, BlockPropsMethods } from './../../utils/Block.js';

type CustomProps = {
  attr?: {
    className?: string;
    [key: string]: any
  };
  methods?: BlockPropsMethods;
  content?: Block[] | string;
}

export class Custom extends Block {

  constructor(tagName: string, props: CustomProps = {}) {
    super(tagName, props);
  }

}
