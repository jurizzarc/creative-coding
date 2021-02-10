let radius = 100;
let numOfSegments = 16;
let points = [];
let angle, centerX, centerY;

function setup() {
    createCanvas(500, 500);
    background(0);
    // noLoop();
    centerX = width/2;
    centerY = height/2;
    angle = radians(360/numOfSegments);
    for (let i = 0; i < numOfSegments; i++) {
        let xPos = radius * cos(angle * i);
        let yPos = radius * sin(angle * i);
        points.push(createVector(xPos, yPos));
    }
}

function draw() {
    background(0);
    // push();
    // translate(centerX, centerY);
    // for (let i = 0; i < points.length; i++) {
    //     fill(255);
    //     ellipse(points[i].x, points[i].y, 5, 5);
    // }
    // for (let i = 0; i < points.length - 1; i++) {
    //     stroke(255, 0, 0);
    //     line(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
    // }
    // line(points[points.length-1].x, points[points.length-1].y, points[0].x, points[0].y);
    // pop();

    // fill(255);
    // noStroke();
    // ellipse(50, 300, 10, 10);
    // ellipse(250, 200, 10, 10);

    push();
    translate(centerX, centerY);
    noFill();
    stroke(255, 0, 0);
    beginShape();
    curveVertex(points[points.length-1].x, points[points.length-1].y); // first controlled point
    for (let i = 0; i < points.length; i++) {
        curveVertex(points[i].x, points[i].y);
    }
    curveVertex(points[0].x, points[0].y); // last controlled point
    curveVertex(points[1].x, points[1].y);
    endShape();
    pop();

    points[5].x += 1;
}