import { Block, BlockPropsMethods } from './../../utils/Block.js';
import { default as modalTemplate } from './Modal.html.js'

interface ModalProps {
  id?: string;
  className?: string;
  header?: string;
  modalContent?: string;
  methods?: BlockPropsMethods;
}

export class Modal extends Block {

  constructor(props: ModalProps = {}) {
    super('div', props, modalTemplate);
  }

  render(template: string, props: ModalProps) {
    const { id, className = 'modal', header, modalContent, methods } = props

    Object.assign(methods, {
      click: function(event: Event) {
        if (event.target === event.currentTarget) {
          (event.target as HTMLElement).classList.remove('modal_open');
        }
      }
    })

    Object.assign(props, {
      attr: { id, className },
      methods,
      header,
      modalContent
    });
    
    return { template, props }
  }

}
