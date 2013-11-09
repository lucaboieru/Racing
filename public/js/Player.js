var Player = function(startX, startY) {
    var x = startX;
    var y = startY;
    var id;

    var getX = function () { return x; }
    var getY = function () { return y; }
    var setX = function (newX) { x = newX; }
    var setY = function (newY) { x = newY; }
    
    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY
    }
};
