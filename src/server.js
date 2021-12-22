require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express());

const PORT = process.env.PORT || 8081;

app.use(cors());

var server = app.listen(
  PORT,
  console.log(`Server is running on the port no: ${PORT} `),
);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

const makeid = (length) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

let rooms = {};

//initializing the socket io connection
io.on('connection', (socket) => {
  socket.on('join', ({ name, roomId }) => {
    const user = {
      id: socket.id,
      name,
      roomId,
    };
    if (typeof rooms[roomId] === 'undefined') {
      rooms[roomId] = {
        name: roomId,
        users: [],
        messages: [],
      };
      rooms[roomId].users.push(user);
    } else {
      rooms[roomId].users.push(user);
    }
    socket.user = user;
    socket.roomId = roomId;
    socket.join(user.roomId);
    io.to(user.roomId).emit('new user', {
      new: socket.user,
      all: rooms[roomId].users,
      name: roomId,
      messages: rooms[roomId].messages,
    });
    socket.on('send message', ({ message, time }) => {
      const msgId = `${Date.now() + message}`;
      const msgObj = { ...socket.user, msg: message, time, msgId };
      rooms[roomId].messages.push(msgObj);
      io.to(user.roomId).emit('accept message', {
        ...msgObj,
        messages: rooms[roomId].messages,
      });
    });
    socket.on('request private chat', ({ socketId, user, name }) => {
      io.to(socketId).emit('receive private chat message', {
        user,
        name,
      });
    });
    socket.on('join private chat', ({ user, name }) => {
      io.to(user).emit('private chat accepted', {
        user,
        name,
        room: makeid(20),
      });
      io.to(socket.id).emit('private chat accepted', {
        user,
        name,
        room: makeid(20),
      });
      console.log({ user, name });
    });
    socket.on('disconnect', () => {
      const index = rooms[socket.roomId].users.findIndex(
        (u) => u.id === socket.id,
      );
      rooms[socket.roomId].users.splice(index, 1);
      io.to(socket.roomId).emit('left', rooms[socket.roomId].users);
    });
  });
});
