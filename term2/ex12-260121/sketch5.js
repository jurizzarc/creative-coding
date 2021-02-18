let stepSize = 1;
let angle = 45;
let angleCount = 5;
let points = [];
let xPos1, yPos1, xPos2, yPos2;

function setup() {
    createCanvas(500, 500);
    background('#f5f5f5');
    xPos1 = 0;
    yPos1 = 0;
}

function draw() {
    let speed = map(mouseX, 0, width, 2, 10);
    for (let i = 0; i < speed; i++) {
        xPos1 += cos(radians(angle) * stepSize);
        yPos1 += sin(radians(angle) * stepSize);
        strokeWeight(2);
        stroke('#2FC6D0');
        point(xPos1, yPos1);
        // storePoints(xPos, yPos);
        if (xPos1 < 0 || xPos1 > width || yPos1 < 0 || yPos1 > height) {
            angle = getRandomAngle(xPos1, yPos1);
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