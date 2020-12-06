import { Block } from './../../../utils/Block.js';
import { default as chatListTemplate } from './Chat__list.html.js';
export class Chat__list extends Block {
    constructor(props = {}) {
        super('li', props, chatListTemplate);
    }
    render(template, props) {
        const { attr, isActive, activeClass, isSelf, selfmsg, title, lastmsg } = props;
        let className = '';
        if (typeof attr !== 'undefined') {
            if (typeof attr.className !== 'undefined') {
                className = attr.className;
            }
        }
        let addclass = '';
        if (isActive === true && typeof activeClass !== 'undefined') {
            addclass = activeClass;
        }
        let selfMsgLen = 50;
        if (isSelf === true && typeof selfmsg !== 'undefined') {
            selfMsgLen -= selfmsg.length;
        }
        Object.assign(props, {
            attr: {
                className: `${className} ${addclass}`
            },
            selfmsg: isSelf ? selfmsg : '',
            title: this._substr(title, 21),
            lastmsg: this._substr(lastmsg, selfMsgLen)
        });
        return { template, props };
    }
    _substr(str, len, add = '…') {
        if (typeof str === 'undefined') {
            return undefined;
        }
        if (str.length > len) {
            return str.trim().substring(0, len).concat(add);
        }
        return str;
    }
}
//# sourceMappingURL=Chat__list.js.map