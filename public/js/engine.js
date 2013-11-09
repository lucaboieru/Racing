console.log("Engine Imported");

var W, A, S, D;

function startEngine () {
    W = false;
    S = false;
    A = false;
    D = false;
    
    // tick
    setInterval (function () {
       // upkey
       if (myPlayer.car.speed < myPlayer.car.maxSpeed && W) {
            myPlayer.car.speed += myPlayer.car.acceleration;
       }
        
       // downkey
       if (myPlayer.car.speed > -2 && S) {
            myPlayer.car.speed -= myPlayer.car.acceleration;
       }

       // breaks
       if (!W && myPlayer.car.speed > 0) {
            myPlayer.car.speed -= (S ? (myPlayer.car.acceleration / 2 + myPlayer.car.break) : myPlayer.car.acceleration / 2);
            if(myPlayer.car.speed <= 0) myPlayer.car.speed = 0; 
       }

       if (!S && myPlayer.car.speed < 0) {
            myPlayer.car.speed += (W ? (myPlayer.car.acceleration / 2 + myPlayer.car.break) : myPlayer.car.acceleration / 2);
            if (myPlayer.car.speed >= 0) myPlayer.car.speed = 0;
       }
        
        if (A) {
            if (myPlayer.car.angle <= -360) myPlayer.car.angle = 0;
            myPlayer.car.angle -= catDaCuCurba(myPlayer.car.speed);
        }
        
        if (D) {
            if (myPlayer.car.angle >= 360) myPlayer.car.angle = 0;
            myPlayer.car.angle += catDaCuCurba(myPlayer.car.speed);
        }
                  
        
       // change positions
       myPlayer.x = (myPlayer.x + Math.cos(Math.PI * (myPlayer.car.angle/180)) * myPlayer.car.speed);
       myPlayer.y = (myPlayer.y + Math.sin(Math.PI * (myPlayer.car.angle/180)) * myPlayer.car.speed);
        socket.emit("move player", {id: myPlayer.id, x: myPlayer.x, y: myPlayer.y, angle: myPlayer.car.angle});
    }, 33);

    // FPS
    setInterval (function () {
        for (var i = 0, l = remotePlayers.length; i < l; ++ i) {
            document.getElementById("c" + remotePlayers[i].id).style.left = remotePlayers[i].x;
            document.getElementById("c" + remotePlayers[i].id).style.top = remotePlayers[i].y;
            document.getElementById("c" + remotePlayers[i].id).style.webkitTransform = "rotate(" + remotePlayers[i].car.angle + "deg)";
        }
        document.getElementById("myCar").style.left = myPlayer.x;
        document.getElementById("myCar").style.top = myPlayer.y;
        document.getElementById("myCar").style.webkitTransform = "rotate(" + myPlayer.car.angle + "deg)";
    }, 33);
}

var catDaCuCurba = function (v) {
    if (v <= 10) {
        return (-16/255) * v * v + (16/15) * v;
    } else {
        return (-4/22.5) * v + 16/3;
    }
}

$(document).ready(function () {
    
    $(document).keydown(function (event) {
        var key = event.keyCode;
        switch (key) {
            case 38:
                W = true;
                break;
            case 40:
                S = true;
                break;
            case 37:
                A = true;
                break;
            case 39:
                D = true;
                break;
        }
    });

    $(document).keyup(function (event) {
        var key = event.keyCode;
        switch (key) {
            case 38:
                W = false;
                break;
            case 40:
                S = false;
                break;
            case 37:
                A = false;
                break;
            case 39:
                D = false;
                break;
        }
    });
});
