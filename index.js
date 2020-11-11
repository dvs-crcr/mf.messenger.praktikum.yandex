const express = require('express');
const app = express();

const PORT = 3000;

/** DevLog */
_log = (...msg) => {
  if (process.argv.includes('--dev')) {
    console.log(...msg);
  }
}

app.use(express.static(__dirname + '/static/'));
app.listen(PORT, () => {
  _log(`APP running on port: ${PORT}`);
});