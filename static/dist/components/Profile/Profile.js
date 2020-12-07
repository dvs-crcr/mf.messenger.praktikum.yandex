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
import { default as profileTemplate } from './Profile.html.js';
var Profile = /** @class */ (function (_super) {
    __extends(Profile, _super);
    function Profile(props) {
        if (props === void 0) { props = {}; }
        return _super.call(this, 'div', props, profileTemplate) || this;
    }
    return Profile;
}(Block));
export { Profile };
//# sourceMappingURL=Profile.js.map