let stepSize = 1;
let angle = 45;
let angleCount = 5;
let sw = 1;
let x1, y1, x2, y2, colorPalette;

function setup() {
    createCanvas(500, 500);
    smooth();
    pixelDensity(5);
    x1 = 0;
    y1 = 0;
    colorPalette = [
        color(225, 221, 191),
        color(4, 37, 58),
        color(76, 131, 122)
    ];
    background(colorPalette[0]);
}

function draw() {
    let speed = map(mouseX, 0, width, 2, 8);
    for (let i = 0; i < speed; i++) {
        x1 += cos(radians(angle)) * stepSize;
        y1 += sin(radians(angle)) * stepSize;
        stroke(colorPalette[1]);
        strokeWeight(sw);
        point(x1, y1);
        x2 = width - x1;
        y2 = height - y1;
        stroke(colorPalette[2]);
        point(x2, y2);
        if (x1 < 0 || x1 > width/2 || y1 < 0 || y1 > height) angle = getRandomAngle(x1, y1);
    }
}

function getRandomAngle(_x, _y) {
    let randomAngle = (floor(random(-angleCount, angleCount)) + 0.5) * 90 / angleCount;
    let swOptions = [1, 2, 3, 4, 5];
    sw = swOptions[floor(random()*swOptions.length)];
    // console.log(randomAngle);
    if (_x > width/2) return randomAngle + 180;
    if (_x < 0) return randomAngle;
    if (_y > height) return randomAngle - 90;
    if (_y < 0) return randomAngle + 90;
}