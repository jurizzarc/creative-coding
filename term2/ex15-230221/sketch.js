let circles = [];
let minR = 10;
let maxR = 20;

function setup() {
    createCanvas(500, 500);
    let circle0 = new Circle(width/2, height/2, maxR*2);
    circles.push(circle0);
}

function draw() {
    background(255);
    let randR = floor(random(minR, maxR));
    let randX = random(randR, width-randR);
    let randY = random(randR, height-randR);
    // Create a circle
    let newC = new Circle(randX, randY, randR);
    addCircle(newC);

    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        if (circle.isGrowing) {
            // Stop circle from growing if it reaches the canvas sides
            if (circle.hitsEdges()) circle.isGrowing = false;
            for (let j = 0; j < circles.length; j++) {
                let other = circles[j];
                if (other != circle) {
                    let distance = circle.coordinates.dist(other.coordinates);
                    // Stop circle from growing if it collides with other circle
                    if (distance < circle.radius + other.radius) circle.isGrowing = false;
                }
            }
        }
        // Draw circle
        circles[i].render();
        // Increase its radius
        circles[i].grow();
    }
}

function addCircle(_newC) {
    let newC = _newC;
    for (let i = 0; i < circles.length; i++) {
        let otherC = circles[i];
        // Get distance between the coordinates of the circles
        let distance = newC.coordinates.dist(otherC.coordinates);
        // Do not add circle to the array if it overlaps other circle
        if (distance < newC.radius + otherC.radius) return null;
    }
    circles.push(newC);
}