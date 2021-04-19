const numOfParticles = 1000;
let particles = [];
let fontSize = 300;
let drawMode = 1;
let graphics, graphicsCol;
let colorPalettes, currentPalette, paletteIndex;
let rad, withinText;
let str = 'flow';

let props = {
    withinText: false
};

function setup() {
    createCanvas(windowWidth, windowHeight);
    smooth();
    pixelDensity(2);
    frameRate(36);
    createGUI();
    // noLoop();

    colorPalettes = [
        [
            color(4, 17, 35),
            color(50, 162, 173),
            color(50, 173, 122),
            color(50, 101, 173)
        ]
    ];

    switch (drawMode) {
        case 1:
            paletteIndex = 0;
            break;
        case 2:
            paletteIndex = 0;
            break;
    }

    currentPalette = colorPalettes[paletteIndex];
    graphicsCol = color(0);
    graphics = createGraphics(width, height);
    createText();
    background(currentPalette[0]);
}

function draw() {
    switch (drawMode) {
        case 1:
            paletteIndex = 0;
            break;
        case 2:
            paletteIndex = 0;
            break;
    }
    updateParticles();
    while (particles.length < numOfParticles) addParticle();
    
    particles.forEach(particle => {
        particle.update();
        // Draw each particle on the canvas
        particle.render();
    });
}

function createText() {
    graphics.textSize(fontSize);
    graphics.textAlign(CENTER, CENTER);
    graphics.fill(graphicsCol);
    graphics.text(str.toUpperCase(), graphics.width/2, graphics.height/2);
    image(graphics, 0, 0);
}

function createGUI() {
    const gui = new dat.GUI();
    const flowFieldFolder = gui.addFolder('Flow Field');
    flowFieldFolder.open();

    flowFieldFolder.add(props, 'withinText').onChange(function() {
        redrawSketch();
    });
}

function addParticle() {
    // Create new particle
    let particle = new Particle(rad);
    if (drawMode !== 1) {
        for (let i = 0; i < particles.length; i++) {
            let other = particles[i];
            // Get distance between the coordinates of the particles
            let distance = particle.coordinates.dist(other.coordinates);
            // Do not add particle to the array if it overlaps other circle
            if (distance < particle.radius + other.radius) return null;
        }
    }
    particles.push(particle);
}

function updateParticles() {
    for (let i = particles.length-1; i >= 0; i--) {
        if (particles[i].life <= 0) particles.splice(i, 1);
    }
}

function redrawSketch() {
    graphics = createGraphics(width, height);
    createText();
    background(currentPalette[0]);
}

function keyReleased() {
    if (key == '1') drawMode = 1;
    if (key == '2') drawMode = 2;
}