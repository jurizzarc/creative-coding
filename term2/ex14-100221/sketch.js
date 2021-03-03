let circles = [];
let numOfCircles = 300;
let minR = 5;
let maxR = 10;
let circle0;

function setup() {
    createCanvas(500, 500);
    colorMode(HSB);
    // noLoop();
    circle0 = new Circle(width/2, height/2, maxR);
    circles.push(circle0);
}

function draw() {
    background(217, 0, 100);
    if (circles.length <= numOfCircles) {
        let randX = random(width);
        let randY = random(height);
        let randR = floor(random(minR, maxR));
        // Create a circle
        let circle = new Circle(randX, randY, randR);
        addCircle(circle);
    }
    circles.forEach(circle => {
        circle.render();
    });
}

function addCircle(_newCircle) {
    let newC = _newCircle;
    let closestDistance, closestIndex;
    // Find closest circle by the distance
    for (let i = 0; i < circles.length; i++) {
        let otherC = circles[i];
        // Get distance between the coordinates of the circles
        let distance = newC.coordinates.dist(otherC.coordinates) - newC.radius - otherC.radius;
        // Do not include newC if it overlaps other circle
        if (distance < 0) return null;
        // The circle with the lowest distance is the closest circle to newC
        if (closestDistance == undefined || distance < closestDistance) {
            closestIndex = i;
            closestDistance = distance;
        }
    }
    newC.dock(circles[closestIndex]);
    circles.push(newC);
}