const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


const PORT = 3000 || process.env.PORT;

const usocket = [];

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/view/index.html');
})

io.on('connection', (socket)=>{
    console.log('user connected');

    socket.on('join', (name)=>{
        usocket[name] = socket;
        io.emit('join', name);
    })

})

server.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));