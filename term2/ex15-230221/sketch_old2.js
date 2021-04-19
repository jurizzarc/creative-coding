let circles = [];
let minR = 2;
let maxR = 10;
let circle0;

function setup() {
    createCanvas(500, 500);
    circle0 = new Circle(width/2, height/2, 40);
    circles.push(circle0);
}

function draw() {
    background(255);

    addCircle();
    
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        if (circle.isGrowing) {
            circle.grow();
            for (let j = 0; j < circles.length; j++) {
                let other = circles[j];
                if (other != circle) {
                    let distance = circle.coordinates.dist(other.coordinates);
                    if (distance < circle.radius + other.radius) circle.isGrowing = false;
                }
            }
            if (circle.isGrowing) {
                if (circle.hitsEdges()) circle.isGrowing = false;
            }
        }
    }

    circles.forEach(circle => {
        circle.render();
    });
}

function addCircle() {
    let randX = random(width);
    let randY = random(height);
    let randR = floor(random(minR, maxR));
    let newC = new Circle(randX, randY, randR);
    for (let i = 0; i < circles.length; i++) {
        let otherC = circles[i];
        // Get distance between the coordinates of the circles
        let distance = newC.coordinates.dist(otherC.coordinates);
        if (distance < newC.radius + otherC.radius) {
            newC = undefined;
            break;
        }
    }
    if (newC) {
        circles.push(newC);
        return true;
    } else {
        return false;
    }
}