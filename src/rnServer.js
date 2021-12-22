require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express());

const PORT = process.env.PORT || 8050;

app.use(cors());

var server = app.listen(
  PORT,
  console.log(`Server is running on the port no: ${PORT} `)
);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let rooms = {};

//initializing the socket io connection
io.on("connection", (socket) => {
    console.log('connected')
    socket.on('join', (payload) => {
        console.log(payload)
    })
  socket.on("disconnect", () => {
      console.log('left')
  });
});
