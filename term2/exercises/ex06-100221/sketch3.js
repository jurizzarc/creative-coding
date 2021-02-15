let circles = [];
let minR = 6;
let maxR = 15;
let fc = 50;
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
    let randX = random(width);
    let randY = random(height);
    let randR = floor(random(minR, maxR));
    for (let i = 0; i < circles.length; i++) {
        let newC = new Circle(randX, randY, randR);
        let overlapping = false;
        for (let j = i + 1; j < circles.length; j++) {
            let otherC = circles[j];
            let distance = newC.coordinates.dist(otherC.coordinates);
            if (distance < newC.radius + otherC.radius) {
                overlapping = true;
            }
        }
        if (!overlapping) {
            circles.push(newC);
        }
    }
}