const canvasSize = 500;
const colourPalettes = [
    ['#571845', '#900C3E', '#C7003A', '#FF5734', '#FFC300'],
    ['#1E254B', '#4B2F65', '#82346A', '#BD3B70', '#EF4275'],
    ['#0D3B40', '#618C7C', '#F25A38', '#F24C3D', '#F2E2CE'],
    ['#173F5F', '#20639B', '#ED553B', '#F6D55C', '#3CAEA3']
];
let colourIndex = [0, 1, 2, 3, 4];
let paletteIndex = 0;
let currentPalette;

let squares = [];
let circles = [];
let cShapes1 = [];
let cShapes2 = [];
let numOfSquares = 5;
let numOfCShapes = numOfSquares + 1;
let numOfCircles = numOfSquares + 1;
let squareSize = canvasSize / numOfSquares;

function setup() {
    createCanvas(canvasSize, canvasSize);
    rectMode(CENTER);
    noLoop();

    for (let i = 0; i < numOfSquares; i++) {
        for (let j = 0; j < numOfSquares; j++) {
            squares.push(new Square(i, j));
        }
    }

    for (let i = 0; i < numOfCShapes; i++) {
        for (let j = 0; j < numOfCShapes; j++) {
            cShapes1.push(new CustomShape1(i, j));
        }
    }

    for (let i = 0; i < numOfCShapes; i++) {
        for (let j = 0; j < numOfCShapes; j++) {
            cShapes2.push(new CustomShape2(i, j));
        }
    }

    for (let i = 0; i < numOfCircles; i++) {
        for (let j = 0; j < numOfCircles; j++) {
            circles.push(new Circle(i, j));
        }
    }
}

function draw() {
    background('#f5f5f5');
    currentPalette = colourPalettes[paletteIndex];

    cShapes1.forEach(cShape1 => {
        cShape1.render();
    });

    cShapes2.forEach(cShape2 => {
        cShape2.render();
    });

    circles.forEach(circle => {
        circle.render();
    });

    // squares.forEach(square => {
    //     square.render();
    // });
}

function mouseClicked() {
    paletteIndex = (paletteIndex + 1) % 3;
    redraw();
}

class Square {
    constructor(_i, _j) {
        this.i = _i;
        this.j = _j;
        this.s = squareSize;
        this.x = this.i * this.s + this.s / 2; //transX
        this.y = this.j * this.s + this.s / 2; //transY
    }

    render() {
        push();
        translate(this.x, this.y);;

        noFill();
        stroke('#fff');
        rect(0, 0, this.s, this.s);
        pop();
    }
}

class CustomShape1 {
    constructor(_i, _j) {
        this.i = _i;
        this.j = _j;
        this.s = squareSize;
        this.x = this.i * this.s + this.s / 2; //transX
        this.y = this.j * this.s; //transY
    }

    render() {
        push();
        translate(this.x, this.y);
        noStroke();
        // blendMode(MULTIPLY);
        drawingContext.shadowOffsetX = -4;
        drawingContext.shadowOffsetY = 4;
        drawingContext.shadowBlur = 20;
        drawingContext.shadowColor = '#000';
        fill(currentPalette[colourIndex[0]]);
        ellipse(0, this.s / 12, this.s / 1.5, this.s / 3);
        fill(currentPalette[colourIndex[1]]);
        ellipse(0, -this.s / 12, this.s / 1.5, this.s / 3);
        pop();
    }
}

class CustomShape2 {
    constructor(_i, _j) {
        this.i = _i;
        this.j = _j;
        this.s = squareSize;
        this.x = this.i * this.s; //transX
        this.y = this.j * this.s - this.s / 2; //transY
    }

    render() {
        push();
        translate(this.x, this.y);
        noStroke();
        // blendMode(MULTIPLY);
        drawingContext.shadowOffsetX = 4;
        drawingContext.shadowOffsetY = -4;
        drawingContext.shadowBlur = 20;
        drawingContext.shadowColor = '#000';
        fill(currentPalette[colourIndex[2]]);
        ellipse(this.s / 12, 0, this.s / 3, this.s / 1.5);
        fill(currentPalette[colourIndex[3]]);
        ellipse(-this.s / 12, 0, this.s / 3, this.s / 1.5);
        pop();
    }
}

class Circle {
    constructor(_i, _j) {
        this.i = _i;
        this.j = _j;
        this.s = squareSize;
        this.x = this.i * this.s; //transX
        this.y = this.j * this.s; //transY
    }

    render() {
        push();
        translate(this.x, this.y);
        fill(currentPalette[colourIndex[4]]);
        // strokeWeight(2);
        // stroke('#fff');
        noStroke();
        ellipse(0, 0, this.s / 2, this.s / 2);
        pop();
    }
}