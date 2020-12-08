var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Block } from './../../../utils/Block.js';
import { default as chatListTemplate } from './Chat__list.html.js';
var Chat__list = /** @class */ (function (_super) {
    __extends(Chat__list, _super);
    function Chat__list(props) {
        if (props === void 0) { props = {}; }
        return _super.call(this, 'li', props, chatListTemplate) || this;
    }
    Chat__list.prototype.render = function (template, props) {
        var attr = props.attr, isActive = props.isActive, activeClass = props.activeClass, isSelf = props.isSelf, selfmsg = props.selfmsg, title = props.title, lastmsg = props.lastmsg;
        var className = '';
        if (typeof attr !== 'undefined') {
            if (typeof attr.className !== 'undefined') {
                className = attr.className;
            }
        }
        var addclass = '';
        if (isActive === true && typeof activeClass !== 'undefined') {
            addclass = activeClass;
        }
        var selfMsgLen = 50;
        if (isSelf === true && typeof selfmsg !== 'undefined') {
            selfMsgLen -= selfmsg.length;
        }
        Object.assign(props, {
            attr: {
                className: className + " " + addclass
            },
            selfmsg: isSelf ? selfmsg : '',
            title: this._substr(title, 21),
            lastmsg: this._substr(lastmsg, selfMsgLen)
        });
        return { template: template, props: props };
    };
    Chat__list.prototype._substr = function (str, len, add) {
        if (add === void 0) { add = '…'; }
        if (typeof str === 'undefined') {
            return undefined;
        }
        if (str.length > len) {
            return str.trim().substring(0, len).concat(add);
        }
        return str;
    };
    return Chat__list;
}(Block));
export { Chat__list };
//# sourceMappingURL=Chat__list.js.map