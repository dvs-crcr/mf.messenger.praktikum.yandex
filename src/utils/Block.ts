import { EventBus } from './EventBus.js';
import { Templator } from './UglyTemplator.js';
import { default as shallowEqualObjects } from './shallowEqualObjects.js';

export type BlockPropsMethods = {
  [key: string]: EventListenerOrEventListenerObject | Function | undefined
}

type BlockPropsType = {
  [key: string]: any,
  attr?: {
    [key: string]: string | undefined
  },
  methods?: BlockPropsMethods,
  content?: Block[] | string
}

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  private eventBus: () => EventBus;
  _element: HTMLElement | undefined = undefined;
  _meta: {tagName: string, props: BlockPropsType};
  _template: string | undefined;
  props: BlockPropsType;

  constructor(tagName: string = 'div', props: BlockPropsType = {}, template?: string) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };
    this._template = template;
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this._element = this._createDocumentElement(this._meta.tagName);
  }

  _createDocumentElement(tagName: string) {
    const { props } = this._meta;
    let node = document.createElement(tagName);
    if (typeof props.content !== 'undefined') {
      let chunkFragment = document.createDocumentFragment();
      if (typeof props.content === 'string') {
        chunkFragment.textContent = props.content;
      } else {
        props.content.forEach((item) => {
          let itemContent = item.getContent()
          if (typeof itemContent !== 'undefined') {
            chunkFragment.appendChild(itemContent);
          }
        })
      }
      node.appendChild(chunkFragment);
    }
    return node;
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    const { props } = this._meta;
    this.componentDidMount(props);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

	componentDidMount(oldProps?: object) {
    if (typeof oldProps !== 'undefined') {

    }
  }

  _componentDidUpdate(oldProps: object, newProps: object) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

  componentDidUpdate(oldProps?: object, newProps?: object) {
    if (typeof oldProps !== 'undefined' && typeof newProps !== 'undefined') {
      if (shallowEqualObjects(oldProps, newProps)) {
        return false
      } else {
        return true
      }
    } else {
      return true;
    }
  }
  
  setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }
    let oldprops = this.props;
    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldprops, nextProps);
  }

  get element() {
    return this._element;
  }

  _setAttributes() {
    if (typeof this.props.attr !== 'undefined' && typeof this._element !== 'undefined') {
      for (let i in this.props.attr) {
        let value = this.props.attr[i];
        if (typeof value !== 'undefined') {
          if (i === 'className') {
            this._element.className = value;
          } else {
            this._element.setAttribute(i, value);
          }
          
        }
      }
    }
  }

  _addEvents() {
    if (typeof this.props.methods !== 'undefined' && typeof this._element !== 'undefined') {
      for (let i in this.props.methods) {
        let listener = this.props.methods[i];
        if (typeof listener !== 'undefined') {
          this._element.addEventListener(i, (listener as EventListenerOrEventListenerObject));
        }
      }
    }
    return;
  }

  _render() {
    const blockRender = this.render(this._template, this.props);
    let props = this.props;
    if (typeof blockRender.props !== 'undefined') {
      props = blockRender.props;
    }
    const block = new Templator(blockRender.template).compile(props);
    this._setAttributes();
    this._addEvents();
    if (block !== undefined && typeof this._element !== 'undefined') {
      this._element.textContent = '';
      this._element.appendChild(block);
    }
  }

  render(template: string | undefined, props: BlockPropsType | undefined) {
    return { template, props }
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: {}) {
    return new Proxy(props, {
      set: (target: { [index: string]: string }, prop: string, value) => {
        if (prop.startsWith('_')) {
          throw new Error('нет доступа');
        } else {
          target[prop] = value;
          return true;
        }
      },
      deleteProperty() {
        throw new Error('нет доступа');
      }
    });
  }

  show() {
    this._element?.classList.remove('hidden');
  }

  hide() {
    this._element?.classList.add('hidden');
  }

}