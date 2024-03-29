import { Block, BlockPropsMethods } from './../../utils/Block.js';

type CustomProps = {
  [key: string]: any;
  attr?: {
    className?: string;
    [key: string]: any
  };
  methods?: BlockPropsMethods;
  content?: Block[] | string;
  _template?: string;
}

export class Custom extends Block {

  constructor(tagName: string, props: CustomProps = {}) {
    super(tagName, props);
  }

  render(template: string, props: CustomProps) {
    const { _template } = props;

    if (typeof _template !== 'undefined') {
      template = _template
    }

    return { template, props }
  }

}
