import { EventBus } from './EventBus.js';
import { Templator } from './UglyTemplator.js';
import { default as shallowEqualObjects } from './shallowEqualObjects.js';
var Block = /** @class */ (function () {
    function Block(tagName, props, template) {
        var _this = this;
        if (tagName === void 0) { tagName = 'div'; }
        if (props === void 0) { props = {}; }
        this._element = undefined;
        this.setProps = function (nextProps) {
            if (!nextProps) {
                return;
            }
            var oldprops = _this.props;
            Object.assign(_this.props, nextProps);
            _this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldprops, nextProps);
        };
        var eventBus = new EventBus();
        this._meta = {
            tagName: tagName,
            props: props
        };
        this._template = template;
        this.props = this._makePropsProxy(props);
        this.eventBus = function () { return eventBus; };
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
    Block.prototype._registerEvents = function (eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    };
    Block.prototype._createResources = function () {
        this._element = this._createDocumentElement(this._meta.tagName);
    };
    Block.prototype._createDocumentElement = function (tagName) {
        var props = this._meta.props;
        var node = document.createElement(tagName);
        if (typeof props.content !== 'undefined') {
            var chunkFragment_1 = document.createDocumentFragment();
            if (typeof props.content === 'string') {
                chunkFragment_1.textContent = props.content;
            }
            else {
                props.content.forEach(function (item) {
                    var itemContent = item.getContent();
                    if (typeof itemContent !== 'undefined') {
                        chunkFragment_1.appendChild(itemContent);
                    }
                });
            }
            node.appendChild(chunkFragment_1);
        }
        return node;
    };
    Block.prototype.init = function () {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    };
    Block.prototype._componentDidMount = function () {
        var props = this._meta.props;
        this.componentDidMount(props);
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    };
    Block.prototype.componentDidMount = function (oldProps) {
        if (typeof oldProps !== 'undefined') {
        }
    };
    Block.prototype._componentDidUpdate = function (oldProps, newProps) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    };
    Block.prototype.componentDidUpdate = function (oldProps, newProps) {
        if (typeof oldProps !== 'undefined' && typeof newProps !== 'undefined') {
            if (shallowEqualObjects(oldProps, newProps)) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    };
    Object.defineProperty(Block.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: false,
        configurable: true
    });
    Block.prototype._setAttributes = function () {
        if (typeof this.props.attr !== 'undefined' && typeof this._element !== 'undefined') {
            for (var i in this.props.attr) {
                var value = this.props.attr[i];
                if (typeof value !== 'undefined') {
                    if (i === 'className') {
                        this._element.className = value;
                    }
                    else {
                        this._element.setAttribute(i, value);
                    }
                }
            }
        }
    };
    Block.prototype._addEvents = function () {
        if (typeof this.props.methods !== 'undefined' && typeof this._element !== 'undefined') {
            for (var i in this.props.methods) {
                var listener = this.props.methods[i];
                if (typeof listener !== 'undefined') {
                    this._element.addEventListener(i, listener);
                }
            }
        }
        return;
    };
    Block.prototype._render = function () {
        var blockRender = this.render(this._template, this.props);
        var props = this.props;
        if (typeof blockRender.props !== 'undefined') {
            props = blockRender.props;
        }
        var block = new Templator(blockRender.template).compile(props);
        this._setAttributes();
        this._addEvents();
        if (block !== undefined && typeof this._element !== 'undefined') {
            this._element.textContent = '';
            this._element.appendChild(block);
        }
    };
    Block.prototype.render = function (template, props) {
        return { template: template, props: props };
    };
    Block.prototype.getContent = function () {
        return this.element;
    };
    Block.prototype._makePropsProxy = function (props) {
        return new Proxy(props, {
            set: function (target, prop, value) {
                if (prop.startsWith('_')) {
                    throw new Error('нет доступа');
                }
                else {
                    target[prop] = value;
                    return true;
                }
            },
            deleteProperty: function () {
                throw new Error('нет доступа');
            }
        });
    };
    Block.prototype.show = function () {
        var _a;
        (_a = this._element) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
    };
    Block.prototype.hide = function () {
        var _a;
        (_a = this._element) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
    };
    Block.EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    };
    return Block;
}());
export { Block };
//# sourceMappingURL=Block.js.map