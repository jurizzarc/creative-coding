let stepSize = 1;
let angle = 45;
let angleCount = 5;
let points = [];
let xPos, yPos;

function setup() {
    createCanvas(500, 500);
    background(0);
    xPos = width/2;
    yPos = height/2;
}

function draw() {
    let speed = map(mouseX, 0, width, 2, 10);
    for (let i = 0; i < speed; i++) {
        stroke(255);
        strokeWeight(2);
        point(xPos, yPos);
        xPos += cos(radians(angle) * stepSize);
        yPos += sin(radians(angle) * stepSize);
        storePoints(xPos, yPos);
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

function storePoints(_xPos, _yPos) {
    points.push(createVector(_xPos, _yPos));
}