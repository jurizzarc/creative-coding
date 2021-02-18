let canvasSize = 500;
let stepSize = 4;
let optionsX = [-1, 0, 1];
let optionsY = [-1, 0, 1];
let colors;
let xPos, yPos;

function setup() {
    createCanvas(canvasSize, canvasSize);
    background('#E2D8A3');
    xPos = width/2;
    yPos = height/2;
    colors = [
        color(225, 182, 83),
        color(225, 105, 78)
    ];
    // noLoop();
}

function draw() {
    //let speed = map(mouseX, 0, width, 1, 3);

    let randomX = floor(random(0, optionsX.length));
    let randomY = floor(random(0, optionsY.length));
    let moveX = randomX * stepSize;
    let moveY = randomY * stepSize;
    xPos += moveX;
    yPos += moveY;
    xPos > width ? xPos = 0: null;
    xPos < 0 ? xPos = width: null;
    yPos > height ? yPos = 0: null;
    yPos < 0 ? yPos = height: null;

    let col = random(colors);
    let a = floor(random(150, 200));
    col.setAlpha(a);
    let radB = floor(random(8, 12));
    noStroke();
    fill(col);
    ellipse(xPos, yPos, radB*2, radB*2);
}