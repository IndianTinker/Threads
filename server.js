var express = require('express')
var colors = require('nice-color-palettes/200');
var app = express();
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
var server = app.listen(port);
var i = 0;
var clientArray = [];
var sumClients = 0;
var avgClient;
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
        'color': colorRand,
        'val': 0
    }
    clientArray.push(data);
    console.log(clientArray)
    socket.on('mouse', mouseMsg);
    io.sockets.emit('borders', clientArray);
    socket.on('draw', (data) => {
        console.log(data);

    })

    socket.on('disconnect', () => {
        var deadSoc = socket.id
        console.log(deadSoc + " disconnected");
        console.log("Client remaining: " + socket.conn.server.clientsCount);
        for (var i = 0; i < clientArray.length; i++) {
            if (clientArray[i].id == deadSoc) {
                clientArray.splice(i, 1);
            }
        }
        console.log(clientArray)
        socket.broadcast.emit('borders', clientArray);
    })


    function mouseMsg(data) {
        //console.log(data.val);

        for (var i = 0; i < clientArray.length; i++) {
            if (clientArray[i].id == data.id) {
                clientArray[i].val = data.val;
            }

        }


        console.log(clientArray);
        sumClients = 0;
        for (var i = 0; i < clientArray.length; i++) {
            sumClients = sumClients + clientArray[i].val;

        }
        console.log('sum: ' + sumClients);
        avgClient = sumClients / (clientArray.length - 1)
        console.log('avg: ' + avgClient);

        socket.broadcast.emit('drawData', avgClient);

    }
    //io.sockets.emit('mouse', data)


}