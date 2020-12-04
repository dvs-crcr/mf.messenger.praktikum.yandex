import { EventBus } from './EventBus.js'
import { Templator } from './Templator.js'

type PropsType = {
  _template?: string,
  attr?: {
    [key: string]: string
  }
}

export interface Block {
  _meta: {
    tagName: string,
    props: PropsType,
    
  };
  props: PropsType;
}

export class Block implements Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  private eventBus: () => EventBus;
  _element: HTMLElement | undefined = undefined;

  constructor(tagName: string = 'div', props: object = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };
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
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    let node = document.createElement(tagName);
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
      // если пропсы являются объектами, то сравнение х****ое
      if (oldProps === newProps) {
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
    Object.assign(this.props, nextProps);
  }

  get element() {
    return this._element;
  }

  _setAttributes() {
    if (typeof this.props.attr !== 'undefined' && typeof this._element !== 'undefined') {
      for (let i in this.props.attr) {
        this._element.setAttribute(i, this.props.attr[i]);
      }
    }
    return;
  }

  _render() {
    const block = this.render();
    console.log(this._element)
    this._setAttributes();
    if (block !== undefined && typeof this._element !== 'undefined') {
      this._element.childNodes.forEach((item) => {
        this._element?.removeChild(item);
      })
      this._element.appendChild(block);
    }
  }

  render() {
    if (typeof this.props._template !== 'undefined') {
      const tmpl = new Templator(this.props._template);
      return tmpl.compile(this.props);
    }
    return undefined
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
          let oldProp = target[prop];
          target[prop] = value;
          this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProp, value);
          return true;
        }
      },
      deleteProperty() {
        throw new Error('нет доступа');
      }
    });
  }



}