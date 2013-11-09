var myPlayer;
var remotePlayers;
var socket;

function start () {
    myPlayer = new Player (255, 255);
    remotePlayers = [];
    
    socket = io.connect("http://localhost", {port: 7777, transports: ["websocket"]});

    setEventHandlers();
}

var setEventHandlers = function () {
    socket.on("connect", onSocketConnected);
    socket.on("disconnect", onSocketDisconnect);
    socket.on("new player", onNewPlayer);
    socket.on("move player", onMovePlayer);
    socket.on("remove player", onRemovePlayer);
}

function onSocketConnected() {
    console.log("Connected to socket server");
    socket.emit("new player", {x: myPlayer.getX(), y: myPlayer.getY()});
};

function onSocketDisconnect() {
    console.log("Disconnected from socket server");
};

function onNewPlayer(data) {
    console.log("New player connected: "+data.id);

    var newPlayer = new Player (data.x, data.y);
    newPlayer.id = data.id;

    remotePlayers.push(newPlayer);
};

function onMovePlayer(data) {

};

function onRemovePlayer(data) {

};
