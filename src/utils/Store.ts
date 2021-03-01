// import { EventBus } from './EventBus.js';
// import { setObject } from './setObject.js';

type ObjectStringType = {
  [index: string]: any
}

export class Store {
  
  private static __instance: Store = new Store();
  private _state: ObjectStringType = {}
  // private _eventBus: EventBus = new EventBus();
  public state: ObjectStringType = this._stateProxy(this._state);
  
  constructor() {
    if (Store.__instance) {
      throw new Error('Для получения экземпляра используйте Store.getInstance()');
    }
    Store.__instance = this;
  }

  public static getInstance(): Store {
    return Store.__instance;
  }

  _stateProxy(state: ObjectStringType) {
    return new Proxy(state, {
      set: (target, prop: string, value) => {
        target[prop] = value;
        // this._eventBus.emit(`store:${prop}`, value)
        return true;
      },
      get: (target, prop: string) => {
        console.log(target, prop)
        return target[prop];
      }
    })
  }




}