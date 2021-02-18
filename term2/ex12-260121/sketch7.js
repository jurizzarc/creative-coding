let stepSize = 1;
let angle = 45;
let angleCount = 5;
let x1, y1, x2, y2;

function setup() {
    createCanvas(500, 500);
    background('#000');
    smooth();
    x1 = 0;
    y1 = 0;
}

function draw() {
    let speed = map(mouseX, 0, width, 2, 8);
    for (let i = 0; i < speed; i++) {
        x1 += cos(radians(angle) * stepSize);
        y1 += sin(radians(angle) * stepSize);
        stroke('#2FC6D0');
        strokeWeight(2);
        point(x1, y1);
        x2 = width - x1;
        y2 = height - y1;
        stroke('#D0392F');
        point(x2, y2);
        if ((x1 < 0 || x1 > width || y1 < 0 || y1 > height)) {
            angle = getRandomAngle(x1, y1);
        }
    }
    // if (frameCount >= 5) noLoop();
}

function getRandomAngle(_x, _y) {
    let randomAngle = (floor(random(-angleCount, angleCount)) + 0.5) * 90 / angleCount;
    if (_x > width) {
        return randomAngle + 180;
    }
    if (_x < 0) {
        return randomAngle;
    }
    if (_y > height) {
        return randomAngle - 90;
    }
    if (_y < 0) {
        return randomAngle + 90;
    }
}