let canvasSize = 1000;
let x = 500;
let y = 500;
let stepSize = 2;
let optionsX = [-1, -1, 0, 1, 1];
let optionsY = [-1, 0, 1, 1];

function setup() {
    createCanvas(canvasSize, canvasSize);
    background(224);
}

function draw() {
    let speed = map(mouseX, 0, width, 2, 40);
    let diam = map(mouseY, 0, height, 1, 10)

    for (let x = 0; x < speed; x++) {
        fill(0);
        noStroke();
        let randomX = round(random(0, optionsX.length));
        let randomY = round(random(0, optionsY.length));
        let moveX = optionsX[randomX] * stepSize;
        let moveY = optionsY[randomY] * stepSize;
        x += moveX;
        y += moveY;
        ellipse(x, y, diam, diam);
    }
}
