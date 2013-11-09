var util = require ('util');
var io = require ('socket.io');
var Player = require("./Player").Player;

var socket;
var players;

function init () {
    players = [];
    
    socket = io.listen(7777);

    socket.configure(function() {
        socket.set("transports", ["websocket"]);
        socket.set("log level", 2);
    });

    setEventHandlers();
}

var setEventHandlers = function() {
    socket.sockets.on("connection", onSocketConnection);
};

function onSocketConnection(client) {
    util.log("New player has connected: "+client.id);
    client.on("disconnect", onClientDisconnect);
    client.on("new player", onNewPlayer);
    client.on("move player", onMovePlayer);
};

function onClientDisconnect() {
    util.log("Player has disconnected: "+this.id);
};

function onNewPlayer(data) {
    console.log(data);
    var newPlayer = new Player (data.x, data.y);

    newPlayer.id = this.id;
     
    this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});
    
    for (var i = 0; i < players.length; i++) {
        var existingPlayer = players[i];
        this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
    };
    
    players.push(newPlayer);
};

function onMovePlayer(data) {

};

function playerById (id) {
    for (var i = 0; i < players.length; ++ i) {
        if (players[i].id === id) return players[i];
    }
    return false;
}

init ();
