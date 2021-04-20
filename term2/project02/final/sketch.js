const numOfParticles = 1000;
let particles = [];
let fontSize = 300;
let drawMode = 1;
let graphics, graphicsFont, graphicsCol;
let colorPalettes, currentPalette;
let paletteIndex = 0;
let str = 'flow';
let noiseScale = 0.03;
let maxLife = 0.4;
let stepSize = 1;
let rad = 6;
let noiseStrength, zOff;

let props = {
    text: str,
    fontSize: fontSize,
    mode: drawMode,
    colorPalette: paletteIndex,
    withinText: false,
    noiseScale: noiseScale,
    maxLife: maxLife,
    stepSize: stepSize
};

function preload() {
    graphicsFont = loadFont('assets/Avenir.otf');
}

function setup() {
    createCanvas(windowWidth-230, windowHeight);
    smooth();
    pixelDensity(2);
    frameRate(24);
    createGUI();
    // noLoop();

    // message = createElement('p', 'Press 1-3 to change draw modes');
    // message.position(windowWidth-200, 10);

    colorPalettes = [
        [
            color(4, 17, 35),
            color(13, 43, 103),
            color(50, 162, 173),
            color(169, 226, 255),
            color(255, 112, 98)
        ],
        [
            color(243, 253, 248),
            color(169, 208, 207),
            color(54, 169, 154),
            color(2, 90, 64),
            color(3, 42, 48)
        ],
    ];
    graphicsCol = color(0);

    resetSketch();
}

function draw() {
    currentPalette = colorPalettes[paletteIndex];
    updateParticles();
    while (particles.length < numOfParticles) addParticle();
    
    particles.forEach(particle => {
        particle.update();
        // Draw each particle on the canvas
        particle.render();
    });
}

function createText() {
    graphics.textFont(graphicsFont);
    graphics.textSize(fontSize);
    graphics.textAlign(CENTER, CENTER);
    graphics.fill(graphicsCol);
    graphics.text(str.toUpperCase(), graphics.width/2, graphics.height/2);
    image(graphics, 0, 0);
}

function createGUI() {
    const gui = new dat.GUI();
    const textFolder = gui.addFolder('Text');
    const flowFieldFolder = gui.addFolder('Flow Field');
    textFolder.open();
    flowFieldFolder.open();

    textFolder.add(props, 'text').onChange(function (value) {
        str = value;
        resetSketch();
        redraw();
    });
    textFolder.add(props, 'fontSize', 200, 700).step(25).onChange(function (value) {
        fontSize = value;
        resetSketch();
        redraw();
    });

    flowFieldFolder.add(props, 'mode', ['1', '2', '3', '4']).onChange(function (value) {
        drawMode = parseInt(value);
        resetSketch();
        redraw();
    });
    flowFieldFolder.add(props, 'colorPalette', ['0', '1']).onChange(function (value) {
        paletteIndex = parseInt(value);
        resetSketch();
        redraw();
    });
    flowFieldFolder.add(props, 'withinText').onChange(function() {
        resetSketch();
        redraw();
    });
    flowFieldFolder.add(props, 'noiseScale', 0.01, 0.1).step(0.01).onChange(function (value) {
        noiseScale = value;
        resetSketch();
        redraw();
    });
    flowFieldFolder.add(props, 'maxLife', 0.1, 2).step(0.1).onChange(function (value) {
        maxLife = value;
        resetSketch();
        redraw();
    });
    flowFieldFolder.add(props, 'stepSize', 1, 5).step(1).onChange(function (value) {
        stepSize = value;
        resetSketch();
        redraw();
    });

    let clearBtn = {
        clear: function() {
            currentPalette = colorPalettes[paletteIndex];
            resetSketch();
            redraw();
        }
    };
    gui.add(clearBtn, 'clear');
}

function addParticle() {
    // Create new particle
    let particle = new Particle(rad);
    if (drawMode === 3 || drawMode === 4) {
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

function resetSketch() {
    currentPalette = colorPalettes[paletteIndex];
    graphics = createGraphics(width, height);
    createText();
    background(currentPalette[0]);
}