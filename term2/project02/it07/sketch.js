const numOfParticles = 1000;
const includeStr = false;
let particles = [];
let str = 'FLOW';
let r = 2;
let pg, pgCol;

function setup() {
    createCanvas(windowWidth, windowHeight);
    smooth();
    pixelDensity(2);
    // noLoop();
    graphicsCol = color(0);
    graphics = createGraphics(width, height);
    graphics.textSize(400);
    graphics.textAlign(CENTER, CENTER);
    graphics.fill(graphicsCol);
    graphics.text(str, graphics.width/2, graphics.height/2);
    image(graphics, 0, 0);
    background(140);
}

function draw() {
    updateParticles();
    while (particles.length < numOfParticles) addParticle();
    
    particles.forEach(particle => {
        particle.update();
        // Draw each particle on the canvas
        particle.render();
    });
}

function addParticle() {
    // Create new particle
    let particle = new Particle(r);
    for (let i = 0; i < particles.length; i++) {
        let other = particles[i];
        // Get distance between the coordinates of the particles
        let distance = particle.coordinates.dist(other.coordinates);
        // Do not add particle to the array if it overlaps other circle
        if (distance < particle.radius + other.radius) return null;
    }
    particles.push(particle);
}

function updateParticles() {
    for (let i = particles.length-1; i >= 0; i--) {
        if (particles[i].life <= 0) particles.splice(i, 1);
    }
}