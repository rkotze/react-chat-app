require('babel-register')({
  presets: ['react', 'env']
});
const express = require('express');

const { start } = require('./react-server');

const app = express();

app.use(express.static('public'));

app.get('*', start);

const PORT = 3000;
app.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
});