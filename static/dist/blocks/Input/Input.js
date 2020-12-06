import { Block } from './../../utils/Block.js';
export class Input extends Block {
    constructor(props = {}) {
        super('input', props);
    }
    render(template, props) {
        const { className, name, type, placeholder, value, methods } = props;
        Object.assign(props, {
            attr: { className, name, type, placeholder, value },
            methods: methods
        });
        return { template, props };
    }
}
//# sourceMappingURL=Input.js.map