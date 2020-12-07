import { Block } from './../../utils/Block.js';
import { default as modalTemplate } from './Modal.html.js';
export class Modal extends Block {
    constructor(props = {}) {
        super('div', props, modalTemplate);
    }
    render(template, props) {
        const { id, className = 'modal', header, modalContent, methods } = props;
        Object.assign(methods, {
            click: function (event) {
                if (event.target === event.currentTarget) {
                    event.target.classList.remove('modal_open');
                }
            }
        });
        Object.assign(props, {
            attr: { id, className },
            methods,
            header,
            modalContent
        });
        return { template, props };
    }
}
//# sourceMappingURL=Modal.js.map