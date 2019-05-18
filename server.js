var express = require('express')
var colors = require('nice-color-palettes/200');
var app = express();
var server = app.listen(3000);
var i = 0;
var colorClientArray = [];

app.use(express.static('public'));

console.log("Server is running");

var socket = require("socket.io")
var io = socket(server);

io.sockets.on('connection', newConnection);



function newConnection(socket) { //This particular socket or client
    console.log('new');
    console.log(socket.conn.server.clientsCount);
    console.log(socket.id);
    colorRand = colors[Math.floor(200 * Math.random())][Math.floor(5 * Math.random())]
    socket.emit('intro', colorRand);
    var data = {
        'id': socket.id,
        'color': colorRand
    }
    colorClientArray.push(data);
    console.log(colorClientArray)
    socket.on('mouse', mouseMsg);


    socket.on('disconnect', () => {
        var deadSoc = socket.id
        console.log(deadSoc + " disconnected");
        console.log("Client remaining: " + socket.conn.server.clientsCount);
        for (var i = 0; i < colorClientArray.length; i++) {
            if (colorClientArray[i].id == deadSoc) {
                colorClientArray.splice(i, 1);
            }
        }
        console.log(colorClientArray)
    })


    function mouseMsg(data) {
        console.log(data);
        socket.broadcast.emit('mouse', data);
        //io.sockets.emit('mouse', data)
    }
}