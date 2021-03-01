import { Block } from './Block.js';
import { renderDOM } from './renderDOM.js';
import { Page } from './Page.js';

class Route {
  private _pathname: string;
  private _block: Block | null = null;
  private _page: typeof Page;
  private _rootQuery: string;

  constructor(rootQuery: string, pathname: string, page: typeof Page) {
    this._rootQuery = rootQuery;
    this._pathname = pathname;
    this._page = page;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block._element!.remove();
      this._block = null;
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._page().render();
      renderDOM(this._rootQuery, this._block);
      return;
    }
  }
}

export default Route;