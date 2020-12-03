import { EventBus } from './eventBus.js'
import { Templator } from './Templator.js'

type PropsType = {
  className?: string
}

export interface Block {
  _meta: {
    tagName: string,
    props: PropsType
  };
  _needRender: boolean;
  props: PropsType;
  _element: HTMLElement;
  _template: string;
}
export class Block implements Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  private eventBus: () => EventBus;
  
  constructor(tagName: string, props: object = {}, _template = '',  _needRender: boolean = false) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };
    this._template = _template;
    this._needRender = _needRender;
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
    this._setClassName(node);
    return node;
  }

  _setClassName(node: HTMLElement): void {
    const { props } = this._meta;
    if (typeof props.className !== 'undefined') {
      let className = '';
      if (typeof props.className === 'string') {
        className = props.className;
      }
      if (Array.isArray(props.className)) {
        className = props.className.join(' ');
      }
      node.className = className;
    }
  }

  init(): void {
    console.log('- INIT', this._meta.tagName)
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    console.log('-- MOUNT', this._meta.tagName)
    const { props } = this._meta;
    this.componentDidMount(props);
    if (this._needRender) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

	componentDidMount(oldProps?: object) {
    if (typeof oldProps !== 'undefined') {

    }
  }

  _componentDidUpdate(oldProps: object, newProps: object) {
    console.log('--- didUpdate', this._meta.tagName)
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      console.log('--- needUpdate', this._meta.tagName)
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

	// Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps?: object, newProps?: object) {
    if (typeof oldProps !== 'undefined' && typeof newProps !== 'undefined') {
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

  _render() {
    console.log('---- render', this._meta.tagName)
    const block = this.render();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._element.innerHTML = block;
  }

	// Может переопределять пользователь, необязательно трогать
  render(): string {
    const tmpl = new Templator(this._template);
    return tmpl.compile(this.props);
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
          let oldProp = target[prop]
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

  show(): void {
    this.getContent().style.display = 'block';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}