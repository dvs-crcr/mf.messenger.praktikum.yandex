import { EventBus } from './event-bus.js'
import { Templator } from './Templator.js'

export interface Block {
  _meta: {
    tagName: string,
    props: object
  };
  template: string;
  tmpl: Templator;
  _element: HTMLElement;
  eventBus: () => EventBus;
}
export class Block implements Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };
  
  props: object;

  constructor(tagName: string, template: string, props: {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };
    this.template = template;
    this.tmpl = new Templator(template);
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
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init(): void {
    console.log('- init')
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  _componentDidMount() {
    console.log('-- mount')
    const { props } = this._meta;
    this.componentDidMount(props);
  }

	componentDidMount(oldProps?: object) {
    if (typeof oldProps !== 'undefined') {
      
    }
  }

  _componentDidUpdate(oldProps: object, newProps: object) {
    console.log(oldProps, newProps)
    console.log('--- didUpdate')

    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      console.log('--- needUpdate')
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

	// Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps?: object, newProps?: object) {
    if (typeof oldProps !== 'undefined' && typeof newProps !== 'undefined') {

    }
    return true;
  }
  
  setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }
    console.log(this.props)
    console.log(nextProps)
    Object.assign(this.props, nextProps);
  }

  get element() {
    return this._element;
  }

  _render() {
    console.log('---- render')
    const block = this.render();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._element.innerHTML = block;
  }

	// Может переопределять пользователь, необязательно трогать
  render(): string {
    return ''
    // return this.tmpl.compile(this.props);
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: {}) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;
    return new Proxy(props, {
      set(target: { [index: string]: string }, prop: string, value) {
        console.log(target.display)
        if (prop.startsWith('_')) {
          throw new Error('нет доступа');
        } else {
          target[prop] = value;
          if (prop === 'display') {
            self.element.style[prop] = value
          }
          self.eventBus().emit(Block.EVENTS.FLOW_CDU, 1, 2);
          return true;
        }
      },
      deleteProperty() {
        throw new Error('нет доступа');
      }
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show(): void {
    this.setProps({
      display: 'block'
    })
  }

  hide(): void {
    this.setProps({
      display: 'none'
    })
  }
}