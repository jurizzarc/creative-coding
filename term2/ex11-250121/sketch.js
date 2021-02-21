let x, y, colours;
let diam = 12;
let step = diam/2;
let t = 0;
let optionsX = [-1, 0, 1];
let optionsY = [-1, 0, 1];

function setup() {
    createCanvas(500, 500);
    background(255);
    x = width/2;
    y = height/2;
    colours = [
        color(107, 61, 79),
        color(148, 76, 102),
        color(180, 111, 131),
        color(244, 118, 154),
        color(253, 138, 178),
        color(247, 166, 188)
    ];
    // frameRate(150);
}

function draw() {
    let randX = floor(random(0, optionsX.length));
    let randY = floor(random(0, optionsY.length));
    let randC = floor(random(0, colours.length));
    let moveX = optionsX[randX] * step * noise(t);
    let moveY = optionsY[randY] * step * noise(t);
    let colour = colours[randC];
    x += moveX;
    y += moveY;
    t += 0.03;
    if (x < 0) x = width;
    if (x > width) x = 0;
    if (y < 0) y = height;
    if (y > height) y = 0;
    noStroke();
    fill(colour);
    ellipse(x, y, diam);
}