let canvasSize = 500;
let stepSize = 5;
let r = 5;
let xPos, yPos, angle;

function setup() {
    createCanvas(canvasSize, canvasSize);
    angleMode(RADIANS);

    xPos = width/2;
    yPos = height/2;
    angle = 45;
    //noLoop();
}

function draw() {
    background(0);
    let speed = map(mouseX, 0, width, 2, 8);

    for (let i = 0; i < speed; i++) {
        noStroke();
        fill(255);
        ellipse(xPos, yPos, r*2, r*2);

        xPos += cos(radians(angle)) * stepSize;
        yPos += sin(radians(angle)) * stepSize;

        xPos >= width - r ? (xPos=width-r, stepSize*=-1, angle=randomAngle(xPos, yPos)): null;
        xPos <= r ? (xPos=r, stepSize*=-1, angle=randomAngle(xPos, yPos)): null;
        yPos >= height - r ? (yPos=height-r, stepSize*=-1, angle=randomAngle(xPos, yPos)): null;
        yPos <= r ? (yPos=r, stepSize*=-1, angle=randomAngle(xPos, yPos)): null;
    }
}

function randomAngle(x, y) {
    if (x >= width - r) {
        return round(random(90, 270));
    }
    if (x <= r) {
        return round(random(0, 90));
    }
    if (y >= height - r) {
        return round(random(0, 180));
    }
    if (y <= r) {
        return round(random(180, 360));
    }
}