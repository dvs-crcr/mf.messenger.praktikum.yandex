import { Block, BlockPropsMethods } from './../../utils/Block.js';
import { default as dropdownTemplate } from './Dropdown.html.js';
import { Custom } from './../../blocks/Custom/Custom.js';
import { Button } from './../../blocks/Button/Button.js';

export type DropdownProps = {
  className?: string;
  methods?: BlockPropsMethods;
  buttonTemplate?: string;
  buttonClasses?: string[];
  listContent?: Block[] | string;
}

export class Dropdown extends Block {
  constructor(props: DropdownProps = {}) {
    super('div', props, dropdownTemplate);
  }
  render(template: string, props: DropdownProps) {
    const { className = 'dropdown', buttonTemplate, buttonClasses = [], listContent } = props;
    const dropdownList = new Custom({
      attr: { className: 'dropdown__list' },
      content: listContent
    });
    const dropdownButton = new Button({
      className: ['dropdown__toggle'].concat(buttonClasses).join(' '),
      _template: buttonTemplate,
      methods: {
        click: (event: Event) => {
          event.preventDefault();
          this.getContent()?.classList.toggle('dropdown_opened');
        }
      }
    });

    Object.assign(props, {
      attr: { className },
      dropdownButton,
      dropdownList
    });
    return { template, props }
  }
}