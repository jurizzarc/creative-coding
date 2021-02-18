// const canvasSize = 500;
const canvasWidth = 1754;
const canvasHeight = 2481;
let shapes = [];
let threads = [];
let numOfSquares = 10;
let threadSize = 5;
let squareSize = canvasWidth / numOfSquares;
let weaveType;

let controls = {
    threadSize: threadSize,
    showGrid: false
};

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    rectMode(CENTER);
    // noLoop();

    weaveType = createSelect();
    weaveType.option('Plain');
    weaveType.option('Twill');
    weaveType.changed(redraw);

    createGUI();

    for (let i = 0; i < numOfSquares; i++) {
        for (let j = 0; j < numOfSquares; j++) {
            shapes.push(new Square(i, j));
        }
    }
}

function draw() {
    background('#f5f0ea');

    shapes.forEach(shape => {
        shape.render();
    });
}

function createGUI() {
    let gui = new dat.GUI();

    gui.add(controls, 'threadSize', 2, 8).step(1).onChange(function (value) {
        threadSize = value; 
        shapes.forEach(shape => {
            shape.ts = threadSize; 
        });
    });

    gui.add(controls, 'showGrid');
}
class Square {
    constructor(_i, _j) {
        this.i = _i;
        this.j = _j;
        this.s = squareSize;
        this.ts = threadSize;
    }

    render() {
        push();
        let squareX = this.i * this.s + this.s / 2;
        let squareY = this.j * this.s + this.s / 2;
        translate(squareX, squareY);
        noFill();
        if (controls.showGrid) {
            stroke(0);
            rect(0, 0, this.s, this.s);
        } else {
            noStroke();
        }

        let indexNum = this.i + this.j;
        // let content = "" + indexNum;
        // fill('#000');
        // text(content, 0, 0);

        noStroke();
        // blendMode(MULTIPLY);

        let threadPos = this.ts * 2;

        if (weaveType.value() == "Plain") {
            if (indexNum % 2 == 0) {
                // Weft Threads
                fill('#900C3E');
                rect(0, -this.s/threadPos, this.s, this.s / this.ts);
                fill('#50163F');
                rect(0, this.s/threadPos, this.s, this.s / this.ts);
                // Warp Threads
                fill('#FF5835');
                rect(-this.s/threadPos, 0, this.s / this.ts, this.s);
                fill('#A90031');
                rect(this.s/threadPos, 0, this.s / this.ts, this.s);
            } else {
                // Weft Threads
                fill('#FF5835');
                rect(-this.s/threadPos, 0, this.s / this.ts, this.s);
                fill('#A90031');
                rect(this.s/threadPos, 0, this.s / this.ts, this.s);
                // Warp Threads
                fill('#900C3E');
                rect(0, -this.s/threadPos, this.s, this.s / this.ts);
                fill('#50163F');
                rect(0, this.s/threadPos, this.s, this.s / this.ts);
            } 
        }

        if (weaveType.value() == "Twill") {
            if (indexNum % 3 == 0) {
                // Weft Threads
                fill('#900C3E');
                rect(0, -this.s/threadPos, this.s, this.s / this.ts);
                fill('#50163F');
                rect(0, this.s/threadPos, this.s, this.s / this.ts);
                // Warp Threads
                fill('#FF5835');
                rect(-this.s/threadPos, 0, this.s / this.ts, this.s);
                fill('#A90031');
                rect(this.s/threadPos, 0, this.s / this.ts, this.s);
            } else {
                // Weft Threads
                fill('#FF5835');
                rect(-this.s/threadPos, 0, this.s / this.ts, this.s);
                fill('#A90031');
                rect(this.s/threadPos, 0, this.s / this.ts, this.s);
                // Warp Threads
                fill('#900C3E');
                rect(0, -this.s/threadPos, this.s, this.s / this.ts);
                fill('#50163F');
                rect(0, this.s/threadPos, this.s, this.s / this.ts);
            }
        }
         
        pop();
    }
}