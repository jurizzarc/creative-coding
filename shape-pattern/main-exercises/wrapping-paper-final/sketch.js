const canvasWidth = 1754;
const canvasHeight = 2481;
const bgColor = '#f5f0ea';

// Color Palettes the user can choose from
const colorPalettes = [
    ['#900C3E', '#50163F', '#FF5835', '#A90031'],
    ['#B41D01', '#960000', '#FFCB18', '#FCB600'],
    ['#DB1C1A', '#AE1417', '#3E8B54', '#2E5033'],
    ['#004445', '#011C1D', '#6FB98F', '#2C7873']
];

let colorIndex = [0, 1, 2, 3];
let paletteIndex = 0;
let currentPalette; // Where the current color pallete on the canvas will be placed in
let threads = [];
let numOfCells = 10;
let cellWidth = canvasWidth / numOfCells;
let cellHeight = canvasHeight / numOfCells;
let weaveType = 'Plain';
let threadSize = 3; 
let hasBlendMode = false;
// let blendType = 'MULTIPLY';

// Values that can be changed on the gui
let controller = {
    // numOfCells: numOfCells,
    showGrid: false,
    showIndex: false,
    weaveTypes: weaveType,
    threadSize: threadSize,
    hasBlendMode: hasBlendMode,
    // blendModes: blendType
};

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    rectMode(CENTER);
    smooth();
    pixelDensity(3.0);
    createGUI();
    noLoop();

    // Populate the threads array with objects made from the class Thread
    for (let i = 0; i < numOfCells; i++) {
        for (let j = 0; j < numOfCells; j++) {
            threads.push(new Thread(i, j));
        }
    }
}

function draw() {
    background(bgColor);
    // Update value placed in the currentPalette variable when right arrow key is pressed
    currentPalette = colorPalettes[paletteIndex];
    // Draw each thread object on the canvas
    threads.forEach(thread => {
        thread.render();
    });
}

// Change color palette when right arrow key is pressed
function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        paletteIndex = (paletteIndex + 1) % colorPalettes.length;
    } 
    redraw();
}

// Create a GUI where user can customise values
function createGUI() {
    let gui = new dat.GUI();
    let gridFolder = gui.addFolder('Grid');
    gridFolder.open();
    let weaveFolder = gui.addFolder('Weave');
    weaveFolder.open();

    // gridFolder.add(controller, 'numOfCells', 5, 30).step(1).onChange(function (value) {
    //     numOfCells = value;
    //     console.log(numOfCells);
    // });

    gridFolder.add(controller, 'showGrid').onChange(function() {
        redraw();
    });
    gridFolder.add(controller, 'showIndex').onChange(function() {
        redraw();
    });
    weaveFolder.add(controller, 'weaveTypes', ['Plain', 'Twill', 'Satin']).onChange(function (value) {
        weaveType = value;
        redraw();
    });
    weaveFolder.add(controller, 'threadSize', 2, 8).step(1).onChange(function (value) {
        threadSize = value;
        threads.forEach(thread => {
            thread.ts = threadSize;
        });
        redraw();
    });
    weaveFolder.add(controller, 'hasBlendMode').onChange(function() {
        redraw();
    });
    
    // weaveFolder.add(controller, 'blendModes', ['MULTIPLY', 'OVERLAY', 'HARD_LIGHT']).onChange(function (value) {
    //     blendType = value;
    //     console.log(blendType);
    // });
}