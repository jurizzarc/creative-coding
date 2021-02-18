const canvasSize = 500;
let squares = [];
let threads = [];
let circles = [];
let numOfSquares = 5;
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
    
    for (let i = 0; i < numOfSquares + 1; i++) {
        for (let j = 0; j < numOfSquares + 1; j++) {
            threads.push(new Thread(i, j));
            circles.push(new Circle(i, j));
        }
    }
}

function draw() {
    background('#f5f0ea');

    squares.forEach(square => {
        square.render();
    });

    threads.forEach(thread => {
        thread.render();
    });

    circles.forEach(circle => {
        //circle.render();
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
        noStroke();
        //stroke(0);
        //rect(0, 0, this.s, this.s);

        // fill('#000');
        // let content = "" + this.i + ", " + this.j;
        // text(content, 0, 0);
        pop();
    }
}

class Thread {
    constructor(_i, _j) {
        this.i = _i;
        this.j = _j;
        this.s = squareSize;
    }

    render() {
        let weftX = this.i * this.s + this.s/2;
        let weftY = this.j * this.s;
        let warpX = this.i * this.s;
        let warpY = this.j * this.s - this.s/2;
        let indexNum = this.i + this.j;
        noStroke();
        if (indexNum % 2 == 0) {
            push();
            translate(weftX, weftY);
            fill('#173F5F');
            ellipse(0, this.s/12, this.s, this.s / 3);
            //blendMode(MULTIPLY);
            fill('#20639B');
            ellipse(0, -this.s / 12, this.s, this.s / 3);
            pop();

            push();
            translate(warpX, warpY);
            fill('#ED553B');
            ellipse(this.s/12, 0, this.s / 3, this.s);
            //blendMode(MULTIPLY);
            fill('#F6D55C');
            ellipse(-this.s / 12, 0, this.s / 3, this.s);
            pop();
        } else {
            push();
            translate(warpX, warpY);
            fill('#ED553B');
            ellipse(this.s/12, 0, this.s / 3, this.s);
            fill('#F6D55C');
            ellipse(-this.s / 12, 0, this.s / 3, this.s);
            pop();

            push();
            translate(weftX, weftY);
            fill('#173F5F');
            ellipse(0, this.s/12, this.s, this.s / 3);
            fill('#20639B');
            ellipse(0, -this.s / 12, this.s, this.s / 3);
            pop();
        }
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