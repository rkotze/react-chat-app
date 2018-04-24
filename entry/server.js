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

const rooms = ['room1', 'room2', 'room3'];
const usernames = {};

io.on('connection', function (socket) {
  socket.on('addUser', function (username) {
    socket.username = username;
    usernames[username] = username;
    socket.room = 'room1';
    socket.join(socket.room);
    socket.emit('updateChat', 'SERVER', 'you have connected to room1');
    socket.broadcast.to('room1').emit('updateChat', 'SERVER', username + ' has connected to this room');
    socket.emit('updateRooms', rooms, 'room1');
  });

  socket.on('sendChat', function (msg) {
    io.sockets.in(socket.room).emit('updateChat', socket.username, msg);
  });

  socket.on('switchRoom', function (newroom) {
    socket.leave(socket.room);
    socket.join(newroom);
    socket.emit('updateChat', 'SERVER', 'you have connected to ' + newroom);
    socket.broadcast.to(socket.room).emit('updateChat', 'SERVER', socket.username + ' has left this room');
    socket.room = newroom;
    socket.broadcast.to(newroom).emit('updateChat', 'SERVER', socket.username + ' has joined this room');
    socket.emit('updateRooms', rooms, newroom);
  });

  socket.on('disconnect', function () {
    delete usernames[socket.username];
    socket.broadcast.emit('updateChat', 'SERVER', socket.username + ' has disconnected');
    socket.leave(socket.room);
  });

});

const PORT = 3000;
http.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
});