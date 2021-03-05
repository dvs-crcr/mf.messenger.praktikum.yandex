const express = require('express');
const child_process = require('child_process');
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
  const options = {
    port: 3000,
    routes: [
      ['/', express.static(path.join(__dirname, 'static'))],
      ['/src', express.static(path.join(__dirname, 'src'))],
      ['/build', express.static(path.join(__dirname, 'build'))],
      ['*', (req, res) => {
        res.sendFile(path.join(__dirname, 'static', 'index.html'));
      }],
    ],
  };
  const appServer = new App(options);
  await appServer.init();
  if (process.argv.includes('--dev')) {
    const open_command = (process.platform == 'darwin'? 'open': process.platform == 'win32' ? 'start': 'xdg-open');
    child_process.exec(`${open_command} http://localhost${(options.port ? `:${options.port}` : '')}`);
  }
})();