const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;

/** DevLog */
_log = (...msg) => {
  if (process.argv.includes('--dev')) {
    console.log(...msg);
  }
}

app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'static')));

app.listen(PORT, () => {
  _log(`APP running on port: ${PORT}`);
});