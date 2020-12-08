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
import { Block } from './../../utils/Block.js';
var Custom = /** @class */ (function (_super) {
    __extends(Custom, _super);
    function Custom(tagName, props) {
        if (props === void 0) { props = {}; }
        return _super.call(this, tagName, props) || this;
    }
    Custom.prototype.render = function (template, props) {
        var _template = props._template;
        if (typeof _template !== 'undefined') {
            template = _template;
        }
        return { template: template, props: props };
    };
    return Custom;
}(Block));
export { Custom };
//# sourceMappingURL=Custom.js.map