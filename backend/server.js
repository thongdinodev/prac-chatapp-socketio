const express = require('express');
const http = require('http');
const Filter = require('bad-words');
const path = require('path');
const socketio = require('socket.io');

const app = express();

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketio(server);

const publicDirectoryPath = path.join(__dirname, '../frontend');

app.use(express.static(publicDirectoryPath));

// SOCKET IO  

io.on('connection', (socket) => {
    socket.emit('message', 'Hello World!');

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    });

    socket.on('sendLocation', (coords) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});