const str = 'FLOW';           // Text to be rendered
const numOfParticles = 1000;  // Maximum amount of particles
let particles = [];           // Where particles are stored
let bgCol, pgCol, pg, zOff, colors;

function setup() {
    createCanvas(windowWidth, windowHeight);
    smooth();
    pixelDensity(2);
    bgCol = color(4, 17, 35);
    pgCol = color(0);
    colors = [
        color(13, 43, 103),
        color(50, 162, 173),
        color(169, 226, 255),
        color(255, 112, 98)
    ];
    // Create off-screen graphics
    pg = createGraphics(width, height);
    pg.textSize(400);
    pg.textAlign(CENTER, CENTER);
    pg.fill(pgCol);
    pg.text(str, pg.width/2, pg.height/2);
    image(pg, 0, 0);
    background(bgCol);
}

function draw() {
    updateParticles();
    particles.forEach(particle => {
        particle.update(); // Update position and life of each particle
        particle.render(); // Draw each particle on the canvas
    });

    // if (frameCount >= 150) noLoop();
}

function updateParticles() {
    // Remove particles with no life left
    for (let i = particles.length-1; i >= 0; i--) {
        if (particles[i].life <= 0) particles.splice(i, 1);
    }
    // Add particles to the array until it reaches max amount
    while (particles.length < numOfParticles) particles.push(new Particle());
}