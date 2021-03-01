import { default as Route } from './Route.js';
import { Page } from './Page.js';

class Router {
  private static __instance: Router
  private routes!: Route[];
  private history!: typeof window.history;
  private _currentRoute!: Route | null;
  private _rootQuery!: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, page: typeof Page) {
    const route = new Route(this._rootQuery, pathname, page);
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: Event) => {
      event.preventDefault();
      this._onRoute((event.currentTarget as Document).location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    let route = this.getRoute(pathname);
    if (!route) {
      route = this.getRoute('/404.html');
    }
    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    if (route) {
      this._currentRoute = route;
      route.render();
    }
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back()
  }

  forward() {
   this.history.forward()
  }

  getRoute(pathname: string) {
   return this.routes.find(route => route.match(pathname));
  }
}

export default Router;