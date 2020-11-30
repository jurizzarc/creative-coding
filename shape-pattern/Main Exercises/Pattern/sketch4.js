const canvasSize = 500;
let shapes = [];
let threads = [];
let numOfShapes = 5;
let squareSize = canvasSize / numOfShapes;

function setup() {
    createCanvas(canvasSize, canvasSize);
    rectMode(CENTER);
    noLoop();

    for (let i = 0; i < numOfShapes; i++) {
        for (let j = 0; j < numOfShapes; j++) {
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

class Square {
    constructor(_i, _j) {
        this.i = _i;
        this.j = _j;
        this.s = squareSize;
    }

    render() {
        push();
        let squareX = this.i * this.s + this.s / 2;
        let squareY = this.j * this.s + this.s / 2;
        translate(squareX, squareY);
        noFill();
        // noStroke();
        stroke(0);
        rect(0, 0, this.s, this.s);

        // fill('#000');
        // let content = "" + this.i + ", " + this.j;
        // text(content, 0, 0);

        let indexNum = this.i + this.j;
        noStroke();
        if (indexNum % 2 == 0) {
            fill('#173F5F');
            rect(0, this.s/10, this.s, this.s / 5);
            fill('#20639B');
            rect(0, -this.s/10, this.s, this.s / 5);

            fill('#ED553B');
            rect(this.s/10, 0, this.s / 5, this.s);
            fill('#F6D55C');
            rect(-this.s/10, 0, this.s / 5, this.s);
        } else {
            fill('#ED553B');
            rect(this.s/10, 0, this.s / 5, this.s);
            fill('#F6D55C');
            rect(-this.s/10, 0, this.s / 5, this.s);

            fill('#173F5F');
            rect(0, this.s/10, this.s, this.s / 5);
            fill('#20639B');
            rect(0, -this.s/10, this.s, this.s / 5);
        }  
        pop();
    }
}