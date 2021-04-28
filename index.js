const express = require('express');
const path = require('path');

class App {
  constructor(options) {
    this.options = options;
    this.app = express();
  }

  init = async () => {
    const {
      port = 3000,
      routes = {},
    } = this.options;
    await this.initRoutes(routes);
    await this.listen(port);
  };

  initRoutes = async (routes) => {
    routes.forEach((route) => {
      this.app.use(...route);
    });
  };

  listen = async (port) => {
    this.app.listen(port, () => {
      this.log(`APP running on port: ${port}`);
    });
  };

  log = (...msg) => {
    if (process.argv.includes('--dev')) {
      console.dir(...msg);
    }
  };
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
})();
