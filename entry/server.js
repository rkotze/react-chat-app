require('babel-register')({
  presets: ['react', 'env', 'stage-1']
});
const express = require('express');
const httpServer = require('http').Server;
const socket = require('socket.io');

const { start } = require('./react-server');

const app = express();
const http = httpServer(app);
const io = socket(http);

app.use(express.static('public'));

app.get('*', start);

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
});