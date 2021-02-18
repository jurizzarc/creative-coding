let stepSize = 1;
let x, y;

function setup() {
    createCanvas(500, 500);
    background(224);
    x = width/2;
    y = height/2;
}

function draw() {
    let speed = map(mouseX, 0, width, 2, 40);
    let diam = map(mouseY, 0, height, 1, 10)

    for (let x = 0; x < speed; x++) {
        noStroke();
        fill(0);

        let randomX = round(random(-1, 1));
        let randomY = round(random(-1, 1));
        let moveX = randomX * stepSize;
        let moveY = randomY * stepSize;
        x += moveX;
        y += moveY;
        ellipse(x, y, diam, diam);
    }
}
