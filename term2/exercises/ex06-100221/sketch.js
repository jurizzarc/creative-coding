let points = [];
let currentBall, dockBall, resultantV, rHeading, rDist;
let newX, newY;

function setup() {
    createCanvas(500, 500);
    background(0);
    noLoop();

    points.push(createVector(100, 300));
    points.push(createVector(300, 100));
}

function draw() {
    for (let i = 0; i < points.length; i++) {
        stroke(255);
        noFill();
        ellipse(points[i].x, points[i].y, 55, 55);
    }

    dock();
}

function dock() {
    // This is the ball we want to move (latest in array)
    currentBall = points[1];
    // This is where we want to dock it to
    dockBall = points[0];

    resultantV = p5.Vector.sub(currentBall, dockBall);
    rHeading = resultantV.heading();
    rDist = resultantV.mag() - 55;

    // Take away the calculated distance from the current position
    newX = currentBall.x - cos(rHeading) * rDist;
    newY = currentBall.y - sin(rHeading) * rDist;

    // Draw the new circle
    fill(255, 0, 0);
    ellipse(newX, newY, 55, 55);
}