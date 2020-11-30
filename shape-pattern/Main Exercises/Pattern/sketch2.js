let squares = [];
let circles = [];
let cShapes1 = [];
let cShapes2 = [];
let canvasSize = 500;
let numOfSquares = 5;
let numOfCShapes = numOfSquares + 1;
let numOfCircles = numOfSquares + 1;
let squareSize = canvasSize / numOfSquares;

function setup() {
    createCanvas(canvasSize, canvasSize);
    rectMode(CENTER);
    angleMode(DEGREES);

    // for (let i = 0; i < numOfSquares; i++) {
    //     for (let j = 0; j < numOfSquares; j++) {
    //         squares.push(new Square(i, j));
    //     }
    // }

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
    background('#f5f0ea');
    // translate(canvasSize/2, -100);
    // rotate(45);
    // squares.forEach(square => {
    //     square.render();
    // });
    cShapes1.forEach(cShape1 => {
        cShape1.render();
    });

    cShapes2.forEach(cShape2 => {
        cShape2.render();
    });

    circles.forEach(circle => {
        circle.render();
    });
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
        stroke('#000');
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
        blendMode(MULTIPLY);
        fill('#173F5F');
        ellipse(0, this.s / 12, this.s / 1.5, this.s / 3);
        fill('#20639B');
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
        blendMode(MULTIPLY);
        fill('#ED553B');
        ellipse(this.s / 12, 0, this.s / 3, this.s / 1.5);
        fill('#F6D55C');
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
        fill('#3CAEA3');
        // strokeWeight(2);
        // stroke('#fff');
        noStroke();
        ellipse(0, 0, this.s / 2, this.s / 2);
        pop();
    }
}