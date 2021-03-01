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
app.use('/assets', express.static(path.join(__dirname, 'static', 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'static', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(PORT, () => {
  _log(`APP running on port: ${PORT}`);
});