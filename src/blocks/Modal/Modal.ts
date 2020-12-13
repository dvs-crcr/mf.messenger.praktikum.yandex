import { Block, BlockPropsMethods } from './../../utils/Block.js';
import { default as modalTemplate } from './Modal.html.js';

export interface ModalProps {
  className?: string;
  header: string;
  modalContent: Block | Block[] | string;
}

export class Modal extends Block {

  constructor(props: ModalProps) {
    super('div', props, modalTemplate);
  }

  render(template: string, props: ModalProps) {
    const { className = 'modal hidden', header, modalContent } = props;
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
    this.insert();
    return { template, props }
  }

  insert() {
    let element = this.getContent();
    if (typeof element !== 'undefined') {
      document.body.insertAdjacentElement('beforeend', element);
    }
  }



}
