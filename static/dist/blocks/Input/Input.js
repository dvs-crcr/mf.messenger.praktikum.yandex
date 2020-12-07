import { Block } from './../../utils/Block.js';
import { validator } from './../../utils/Validator.js';
export class Input extends Block {
    constructor(props = {}) {
        super('input', props);
    }
    render(template, props) {
        const { attr, className, name, type, placeholder, value, validate = [], methods = {} } = props;
        if (validate.length > 0) {
            Object.assign(methods, {
                focus: () => {
                    this._validateBlock();
                },
                blur: () => {
                    this._validateBlock(false);
                }
            });
        }
        Object.assign(props, {
            attr: Object.assign({ className, name, type, placeholder, value }, attr),
            methods,
            validate
        });
        return { template, props };
    }
    _validateBlock(needReport = true) {
        const target = this._element;
        if (typeof target !== 'undefined') {
            const { validate = [] } = this.props;
            const validMessage = validator._exec(validate, target.value, true);
            if (validMessage === true) {
                target.setCustomValidity('');
            }
            else if (typeof validMessage === 'string') {
                target.setCustomValidity(validMessage);
                if (needReport) {
                    target.reportValidity();
                }
            }
        }
    }
}
//# sourceMappingURL=Input.js.map