import { Block, BlockPropsMethods } from './../../utils/Block.js';
import { default as modalTemplate } from './Modal.html.js';

export interface ModalProps {
  caller_context?: Block | string;
  className?: string;
  header: string;
  modalContent: Block | Block[] | string;
}

export class Modal extends Block {

  constructor(props: ModalProps) {
    super('div', props, modalTemplate);
  }

  render(template: string, props: ModalProps) {
    const { className = 'modal hidden', header, modalContent, caller_context } = props;
    const methods: BlockPropsMethods = {
      click: (event: Event) => {
        event.preventDefault();
        if (event.target === event.currentTarget) {
          this.hide();
        }
      }
    }
    Object.assign(props, {
      attr: { className },
      methods,
      header,
      modalContent
    });
    this.insert(caller_context);
    return { template, props }
  }

  insert(caller_context?: Block | string) {
    let element = this.getContent();
    let context = document.body;
    if (caller_context) {
      if (typeof caller_context === 'string') {
        context = document.querySelector(caller_context) || document.body;
      } else {
        context = caller_context._element!;
      }
    }
    if (typeof element !== 'undefined') {
      context?.insertAdjacentElement('beforeend', element);
    }
  }



}
