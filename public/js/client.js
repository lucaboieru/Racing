var myPlayer;
var remotePlayers;
var socket;

function start () {
    myPlayer = new Player (100, 100);
    remotePlayers = [];
    
    socket = io.connect("http://racing.nodejitsu.com", {port: 80, transports: ["websocket"]});

    setEventHandlers();
}

var setEventHandlers = function () {
    socket.on("connect", onSocketConnected);
    socket.on("disconnect", onSocketDisconnect);
    socket.on("new player", onNewPlayer);
    socket.on("move player", onMovePlayer);
    socket.on("remove player", onRemovePlayer);
    socket.on("getMyId", getMyId);
};

function getMyId(data) {
    myPlayer.id = data.id;
} 

function onSocketConnected() {
    console.log("Connected to socket server");
    socket.emit("new player", {x: myPlayer.getX(), y: myPlayer.getY()});
    $("#game").append("<div class='car' style='top:0px; left:0px;' id='myCar'></div>");
}

function onSocketDisconnect() {
    console.log("Disconnected from socket server");
}

function onNewPlayer(data) {
    console.log("New player connected: "+data.id);

    var newPlayer = new Player (data.x, data.y);
    newPlayer.id = data.id;
    
    // add DOM element
    $("#game").append("<div class='car' style='top:0px; left:0px;' id='c" + data.id + "'></div>");

    remotePlayers.push(newPlayer);
}

function onMovePlayer(data) {
    var playerToMove = playerById (data.id);
    
    if (!playerToMove) {
        util.log("Player not found");
        return;
    }
    playerToMove.x = data.x;
    playerToMove.y = data.y;
    playerToMove.car.angle = data.angle;
}

function onRemovePlayer(data) {
    var playerToRemove = playerById(data.id);

    if (!playerToRemove) {
        util.log("Player not found");
        return;
    }
    
    $("#c" + data.id).remove();
    remotePlayers.splice(remotePlayers.indexOf(playerToRemove), 1);
}

function  playerById (id) {
    for (var i = 0; i < remotePlayers.length; ++ i) {
        if (remotePlayers[i].id === id) return remotePlayers[i];
    }
    return false;
}
