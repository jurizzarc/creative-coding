let numOfSegments = 16;
let radius = 100;
let bgColor = '#000';
let strokeColor = '#FF483E';
let points = [];
let centerX, centerY;

function setup() {
    createCanvas(500, 500);
    background(bgColor);
    centerX = width/2;
    centerY = height/2;
    for (let i = 0; i < numOfSegments; i++) {
        points.push(new CustomShape(i, strokeColor));
    }
}

function draw() {
    background(bgColor);
    push();
    translate(centerX, centerY);
    drawCurveVertices(points);
    points.forEach(point => {
        point.animate();
    });
    pop();
}

function drawLines(_array) {
    for (let i = 0; i < _array.length - 1; i++) {
        _array[i].drawLine(i+1);
    }
    line(_array[_array.length-1].coordinates.x, _array[_array.length-1].coordinates.y,
        _array[0].coordinates.x, _array[0].coordinates.y);
}

function drawCurveVertices(_array) {
    beginShape();
    // first controlled points
    curveVertex(_array[_array.length-1].coordinates.x, _array[_array.length-1].coordinates.y);
    curveVertex(_array[_array.length-1].coordinates.x, _array[_array.length-1].coordinates.y);
    _array.forEach(item => {
        item.drawCurveVertex();
    });
    // last controlled points
    curveVertex(_array[0].coordinates.x, _array[0].coordinates.y);
    curveVertex(_array[0].coordinates.x, _array[0].coordinates.y);
    endShape();
}