let numOfSegments = 180;
let bgColor = '#000';
let color = '#00C2BA';
let points = [];
let z = 0;
let centerX, centerY, radius, angle;

function setup() {
    createCanvas(500, 500);
    background(bgColor);
    centerX = width/2;
    centerY = height/2;
    radius = 150;
    angle = radians(360/numOfSegments);
    for (let i = 0; i < numOfSegments; i++) {
        let xPos = radius * cos(angle * i);
        let yPos = radius * sin(angle * i);
        points.push(new Point(xPos, yPos));
    }
}

function draw() {
    background(bgColor);
    push();
    translate(centerX, centerY);
    animatePoints();
    // points.forEach(point => {
    //     point.drawEllipse();
    // });
    // drawLines(points);
    drawCurveVertices(points);
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
    noFill();
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

function animatePoints() {
    points = [];
    z += 0.01;
    for (let i = 0; i < numOfSegments; i++) {
        let x = map(cos(i), 0, 1, 3, 7);
        let y = map(sin(i), 0, 1, 3, 7);
        let n = noise(x, y, z);
        let xPos = radius * cos(angle*i) * n;
        let yPos = radius * sin(angle*i) * n;
        points.push(new Point(xPos, yPos));
    }
}