import { Block } from './../../utils/Block.js';
export class Custom extends Block {
    constructor(tagName, props = {}) {
        super(tagName, props);
    }
    render(template, props) {
        const { _template } = props;
        if (typeof _template !== 'undefined') {
            template = _template;
        }
        return { template, props };
    }
}
//# sourceMappingURL=Custom.js.map