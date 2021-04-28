let circles = [];
let minR = 3;
let maxR = 25;
let gap = 1;
let graphics, graphicsColor, colorPalette;

function setup() {
    createCanvas(500, 500);
    // noLoop();
    graphicsColor = color(0);
    colorPalette = [
        color(255, 238, 173),
        color(150, 206, 180),
        color(255, 111, 105),
        color(255, 204, 92),
        color(136, 216, 176)
    ];
    graphics = createGraphics(width, height);
    graphics.fill(graphicsColor);
    graphics.rectMode(CENTER);
    graphics.rect(width/2, height/2, 350, 350);
    image(graphics, 0, 0);
    background(colorPalette[0]);
}

function draw() {
    let randR = floor(random(minR, maxR));
    // Create a circle
    let newC = new Circle(randR);
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
                    if (distance < circle.radius + other.radius + gap) circle.isGrowing = false;
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