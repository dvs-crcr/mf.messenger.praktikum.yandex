const express = require('express');
const path = require('path');

class App {
  constructor(options) {
    this._options = options;
    this._app = express();
  }

  init = async () => {
    const { port = 3000, routes = {} } = this._options;
    await this._init_routes(routes);
    await this._listen(port);
  }

  _init_routes = async (routes) => {
    routes.forEach((route) => {
      this._app.use(...route);
    });
  }

  _listen = async (port) => {
    this._app.listen(port, () => {
      this._log(`APP running on port: ${port}`);
    });
  }

  _log = (...msg) => {
    if (process.argv.includes('--dev')) {
      console.log(...msg);
    }
  }
}

(async () => {
  const appServer = new App({
    routes: [
      ['/src', express.static(path.join(__dirname, 'src'))],
      ['/', express.static(path.join(__dirname, 'static'))],
      ['/dist', express.static(path.join(__dirname, 'build'))],
    ],
  });
  await appServer.init();
})();
