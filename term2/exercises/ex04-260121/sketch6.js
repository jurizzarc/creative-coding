let stepSize = 1;
let angle = 45;
let angleCount = 5;
let points = [];
let xPos, yPos, color1, color2, tempArray;

function setup() {
    createCanvas(500, 500);
    background(0);
    // noLoop();
    xPos = width/2;
    yPos = height/2;
    color1 = color(90, 36, 122);
    color2 = color(27, 206, 223);
}

function draw() {
    let speed = map(mouseX, 0, width, 2, 10);
    for (let i = 0; i < speed; i++) {
        xPos += cos(radians(angle) * stepSize);
        yPos += sin(radians(angle) * stepSize);
        points.push(createVector(xPos, yPos));
        // stroke(255);
        // strokeWeight(2);
        if (frameCount > 10) {
            drawPoint(points);
        }
        point(xPos, yPos)
        if (xPos < 0 || xPos > width || yPos < 0 || yPos > height) {
            angle = getRandomAngle(xPos, yPos);
        }
    }
}

function getRandomAngle(_xPos, _yPos) {
    let randomAngle = (floor(random(-angleCount, angleCount)) + 0.5) * 90 / angleCount;
    if (_xPos > width) {
        return randomAngle + 180;
    }
    if (_xPos < 0) {
        return randomAngle;
    }
    if (_yPos > height) {
        return randomAngle - 90;
    }
    if (_yPos < 0) {
        return randomAngle + 90;
    }
}

function drawPoint(_array) {
    // Get last ten elements of array
    tempArray = _array.slice(Math.max(_array.length -10, 1));
    let x1 = tempArray[0].x;
    let x2 = tempArray[9].x;
    for (let i = x1; i < x2; i++) {
        let amt = map(i, x1, x2, 0, 1);
        let color = lerpColor(color1, color2, amt);
        stroke(color);
        strokeWeight(2);
        // line(i, tempArray[0].y, i, tempArray[9].y);
    }
}