import { Block } from './../../utils/Block.js';
export class Button extends Block {
    constructor(props = {}) {
        super('button', props);
    }
    render(template, props) {
        const { className, type, value, methods = {}, _template } = props;
        if (typeof _template !== 'undefined') {
            template = _template;
        }
        Object.assign(props, {
            attr: { className, type, value },
            methods
        });
        return { template, props };
    }
}
//# sourceMappingURL=Button.js.map