var Player = function(startX, startY) {
    var x = startX;
    var y = startY;
    var id;

    var getX = function () { return x; }
    var getY = function () { return y; }
    var setX = function (newX) { x = newX; }
    var setY = function (newY) { x = newY; }
    
    var car = {
        acceleration: 0.5,
        break: 0.2,
        maxSpeed: 15,
        speed: 0,
        angle: 0
    };

    return {
        x: x,
        y: y,
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        car: car
    }
};
