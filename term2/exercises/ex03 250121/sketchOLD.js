let canvasSize = 500;
let xPos, yPos;
let drawMode = 0;
let stepSize = 3;
let optionsX = [-1, 0, 1];
let optionsY = [-1, 0, 1];

function setup() {
    createCanvas(canvasSize, canvasSize);
    background(224);

    xPos = canvasSize/2;
    yPos = canvasSize/2;
}

function draw() {
    let speed = map(mouseX, 0, width, 2, 10);
    let diam = map(mouseY, 0, height, 3, 10);

    for (let x = 0; x < speed; x++) {
        if (drawMode == 1) {
            fill(255, 0, 0, 10);
        }
        if (drawMode == 2) {
            fill(0, 255, 0, 10);
        }

        if (drawMode == 3) {
            fill(0, 0, 255, 10);
        }
        
        if (drawMode == 0) {
            fill(0, 10);
        }

        noStroke();
        let randomX = floor(random(0, optionsX.length));
        let randomY = floor(random(0, optionsY.length));
        let moveX = optionsX[randomX] * stepSize;
        let moveY = optionsY[randomY] * stepSize;
        xPos = xPos + moveX;
        yPos = yPos + moveY;
        if (xPos > width) {
            xPos = 0;
        }
        if (yPos > height) {
            yPos = 0;
        }
        ellipse(xPos, yPos, diam, diam);
    }
}

function keyReleased() {
    if (keyCode == DELETE || keyCode == BACKSPACE) clear() 

    if (key == '1') {
        drawMode = 1;
        stepSize = 1;
        diameter = 1;
    }

    if (key == '2') {
        drawMode = 2;
        stepSize = 5;
        diameter = 5;
    }

    if (key == '3') {
        drawMode = 3;
        stepSize = 10;
        diameter = 10;
    }
}
