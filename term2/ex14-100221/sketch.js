let circles = [];
let minR = 5;
let maxR = 10;
let fc = 150;
let circle0, circle1;

function setup() {
    createCanvas(500, 500);
    colorMode(HSB);
    // frameRate(2);
    // noLoop();
    circle0 = new Circle(width/2, height/2, maxR);
    circles.push(circle0);
    // circle1 = new Circle(width/3, height/2, minR);
    // circles.push(circle1);
}

function draw() {
    background(217, 0, 100);
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
    // Create a circle
    let newC = new Circle(randX, randY, randR);
    let closestDistance;
    let closestIndex;
    // Find closest circle by the distance
    for (let i = 0; i < circles.length; i++) {
        let otherC = circles[i];
        // Get distance between the coordinates of the circles
        let distance = newC.coordinates.dist(otherC.coordinates);
        // The circle with the lowest distance is the closest circle
        if (closestDistance == undefined || distance < closestDistance) {
            closestIndex = i;
            closestDistance = distance;
            // console.log(closestDistance);
            // console.log(closestIndex);
        }
    }
    newC.dock(circles[closestIndex]);
    circles.push(newC);
}