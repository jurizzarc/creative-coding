let circles = [];
let minR = 6;
let maxR = 15;
let fc = 120;
let circle0, circle1;

function setup() {
    createCanvas(500, 500);
    colorMode(HSB);
    frameRate(2);
    // noLoop();
    circle0 = new Circle(width/2, height/2, maxR);
    circles.push(circle0);
    // circle1 = new Circle(width/3, height/2, minR);
    // circles.push(circle1);
}

function draw() {
    background('#f5f5f5');
    // circle1.dock(circle0);
    addCircle();
    circles.forEach(circle => {
        circle.render();
    });
    if (frameCount >= fc) noLoop();
}

function addCircle() {
    let randR = floor(random(minR, maxR));
    let randX = random(randR, width-randR);
    let randY = random(randR, height-randR);
    let newC = new Circle(randX, randY, randR);
    let closestDistance;
    let closestIndex;
    for (let i = 0; i < circles.length; i++) {
        let otherC = circles[i];
        let distance = newC.coordinates.dist(otherC.coordinates);
        if (!closestDistance || distance < closestDistance) {
            closestIndex = i;
            closestDistance = distance;
        }
    }
    circles.push(newC);
    newC.dock(circles[closestIndex]);
}