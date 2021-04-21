const numOfAgents = 1000;
let agents = [];
let colorPalette = [];

let str = 'flow';
let fontSize = 300;
let drawMode = 'Point';
let backgroundColor = '#F5F5F5';
let baseColor = '#45C077';
let schemeType = 'Analogous'; 
let noiseScale = 0.005;
let maxLife = 0.4;
let stepSize = 1;

// Parameters that can be controlled by the user
let props = {
    text: str,
    fontSize: fontSize,
    mode: drawMode,
    baseColor: baseColor,
    bgColor: backgroundColor,
    schemeType: schemeType,
    withinText: false,
    noiseScale: noiseScale,
    maxLife: maxLife,
    stepSize: stepSize
};

let graphics, graphicsFont, graphicsColor, rad;

function preload() {
    // Get font from assets folder
    graphicsFont = loadFont('assets/Avenir.otf');
}

function setup() {
    createCanvas(windowWidth-230, windowHeight);
    smooth();
    pixelDensity(2);
    createGUI();
    // frameRate(24);
    // noLoop();
    graphicsColor = color(0);
    resetSketch();
}

function draw() {
    createColorPalette(baseColor);
    removeAgents();
    // Create agents until the maximum amount is reached
    while (agents.length < numOfAgents) addAgent();
    
    agents.forEach(agent => {
        // Move agent
        agent.update();
        // Check if agent hits the sides of the canvas
        agent.hitsEdges();
        // Draw agent on the canvas
        agent.render();
    });
}

/**
 * Renders text into an off-screen graphics
 */
function createText() {
    graphics = createGraphics(width, height);
    graphics.textFont(graphicsFont);
    graphics.textSize(fontSize);
    graphics.textAlign(CENTER, CENTER);
    graphics.fill(graphicsColor);
    graphics.text(str.toUpperCase(), graphics.width/2, graphics.height/2);
    image(graphics, 0, 0);
}

/**
 * Creates gui for controlling parameters
 */
function createGUI() {
    const gui = new dat.GUI();
    const textFolder = gui.addFolder('Text');
    const flowFieldFolder = gui.addFolder('Flow Field');
    textFolder.open();
    flowFieldFolder.open();

    // Run resetSketch() and draw() when the value of a parameter changes
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

    flowFieldFolder.add(props, 'mode', ['Point', 'Ellipse', 'Line']).onChange(function (value) {
        drawMode = value;
        resetSketch();
        redraw();
    });
    flowFieldFolder.addColor(props, 'bgColor').onChange(function (value) {
        backgroundColor = value;
        resetSketch();
        redraw();
    });
    flowFieldFolder.addColor(props, 'baseColor').onChange(function (value) {
        baseColor = value;
        createColorPalette(baseColor);
        resetSketch();
        redraw();
    });
    flowFieldFolder.add(props, 'schemeType', ['Complementary', 'Analogous', 'Monochromatic', 'Triadic', 'Tetradic']).onChange(function (value) {
        schemeType = value;
        resetSketch();
        redraw();
    });
    flowFieldFolder.add(props, 'withinText').onChange(function() {
        resetSketch();
        redraw();
    });
    flowFieldFolder.add(props, 'noiseScale', 0.001, 0.05).step(0.001).onChange(function (value) {
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
            resetSketch();
            redraw();
        }
    };
    gui.add(clearBtn, 'clear');
}

/**
 * Creates a color palette using the base colour
 * @param {color} _baseColor 
 */
function createColorPalette(_baseColor) {
    // First set the colour mode to HSB to get the colours from the HSB colour wheel
    colorMode(HSB);
    // Create colour for the base colour
    const base = color(_baseColor);
    // Calculate complementary colour 
    const complementary = color((hue(base) + 180) % 360, saturation(base), brightness(base));
    // Calculate monochromatic colours
    const monochromatic1 = color(hue(base), saturation(base), (brightness(base) - 10));
    const monochromatic2 = color(hue(base), saturation(base), (brightness(base) - 20));
    // Calculate analogous colours
    const analogous1 = color((hue(base) + 30) % 360, saturation(base), brightness(base));
    const analogous2 = color((hue(base) + 330) % 360, saturation(base), brightness(base));
    // Calculate triadic colours
    const triadic1 = color((hue(base) + 120) % 360, saturation(base), brightness(base));
    const triadic2 = color((hue(base) + 240) % 360, saturation(base), brightness(base));
    // Calculate tetradic colours
    const tetradic1 = color((hue(base) + 90) % 360, saturation(base), brightness(base));
    const tetradic2 = color((hue(base) + 180) % 360, saturation(base), brightness(base));
    const tetradic3 = color((hue(base) + 270) % 360, saturation(base), brightness(base));
    // Create colour palette based on scheme type
    if (schemeType == 'Complementary') colorPalette = [base, complementary];
    if (schemeType == 'Monochromatic') colorPalette = [base, monochromatic1, monochromatic2];
    if (schemeType == 'Analogous') colorPalette = [base, analogous1, analogous2];
    if (schemeType == 'Triadic') colorPalette = [base, triadic1, triadic2];
    if (schemeType == 'Tetradic') colorPalette = [base, tetradic1, tetradic2, tetradic3];
    // Change the colour mode to 'convert' the calculated colour values to RGB
    colorMode(RGB);
}

/**
 * Creates an agent from the Agent class
 * Adds this agent to the agents array
 */
function addAgent() {
    // Give agent a smaller radius if it's in the text, otherwise give it a slightly larger radius
    if (props.withinText) {
        rad = 2;
    } else {
        rad = 7;
    }
    // Create new agent object from Agent class
    let agent = new Agent(rad);
    // Use circle packing approach to set the initial coordinates of the agent if it's drawn as an ellipse
    if (drawMode == 'Ellipse') {
        for (let i = 0; i < agents.length; i++) {
            // Get the other agent object
            let other = agents[i];
            // Get distance between the coordinates of the agents
            let distance = agent.coordinates.dist(other.coordinates);
            // Do not add agent to the array if it overlaps other circle
            if (distance < agent.radius + other.radius) return null;
        }
    }
    // Add agent to the array
    agents.push(agent);
}

/**
 * Stops the agent's movement when it has no life left
 */
function removeAgents() {
    for (let i = agents.length-1; i >= 0; i--) {
        // Remove agent from the agents array if it has no life left
        if (agents[i].life <= 0) agents.splice(i, 1);
    }
}

/**
 * Re-creates the off-screen graphics
 * Clears the canvas
 */
function resetSketch() {
    createText();
    background(backgroundColor);
}

function keyPressed() {
    if (key == 's' || key == 'S') {
        // Save current canvas as an image if the user presses S
        saveCanvas(gd.timestamp(), 'png');
    }
}