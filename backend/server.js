const express = require('express');
const http = require('http');
const Filter = require('bad-words');
const path = require('path');
const socketio = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/messages');

const app = express();

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketio(server);

const publicDirectoryPath = path.join(__dirname, '../frontend');

app.use(express.static(publicDirectoryPath));

// SOCKET IO  

io.on('connection', (socket) => {

    socket.broadcast.emit('message', generateMessage('A new user has join'));

    socket.emit('message', generateMessage('Welcome!'));

    socket.on('sendMessage', (message, callback) => {
        io.emit('message', generateMessage(message));
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {
        io.emit('sendLocationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
        callback();
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});