let circles = [];
let minR = 8;
let maxR = 40;
let circle0;

function setup() {
    createCanvas(500, 500);
    circle0 = new Circle(width/2, height/2, maxR);
    circles.push(circle0);
}

function draw() {
    background(255);
    let circle = addCircle();
    if (circle != null) {
        circles.push(circle);
    }

    for (let i = 0; i < circles.length; i++) {
        let circleA = circles[i];
        if (circleA.isGrowing) {
            if (circleA.hitsEdges()) circleA.isGrowing = false;
        } else {
            let isOverlapping = false;
            for (let j = 0; j < circles.length; j++) {
                let circleB = circles[j];
                if (circleA !== circleB) {
                    let distance = circleA.coordinates.dist(circleB.coordinates);
                    if (distance < circleA.radius + circleB.radius) {
                        isOverlapping = true;
                        circleA.isGrowing = false;
                        break;
                    }
                }
            }
        }
        circleA.render();
        circleA.grow();
    }
}

function addCircle() {
    let randX = random(width);
    let randY = random(height);
    let randR = floor(random(minR, maxR));
    let newCoords = createVector(randX, randY);
    let valid = true;
    for (let i = 0; i < circles.length; i++) {
        let otherC = circles[i];
        // Get distance between the coordinates of the circles
        let distance = newCoords.dist(otherC.coordinates);
        if (distance < otherC.radius) {
            valid = false;
            break;
        }
    }
    if (valid) {
        return new Circle(newCoords.x, newCoords.y, randR);
    } else {
        return null;
    }
}