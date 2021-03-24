const str = 'FLOW';         // Text to be rendered
const numOfParticles = 1000; // Maximum amount of particles
let particles = [];         // Where particles are stored
let bgCol, pgCol, pg, zOff;

function setup() {
    createCanvas(windowWidth, windowHeight);
    smooth();
    bgCol = color(245);
    pgCol = color(0);
    // Create off-screen graphics
    pg = createGraphics(width, height);
    pg.textSize(400);
    pg.textAlign(CENTER, CENTER);
    pg.fill(pgCol);
    pg.text(str, pg.width/2, pg.height/2);
    for (let i = 0; i < numOfParticles; i++) {
        particles.push(new Particle());
    }
    image(pg, 0, 0);
    background(bgCol);
}

function draw() {
    zOff = frameCount * 0.01;
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