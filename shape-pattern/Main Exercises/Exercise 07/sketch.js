let squares = [];
let canvasSize = 500;
let numOfSquares = 20;
let squareSize = canvasSize/numOfSquares;
let col, d;

function setup() {
  createCanvas(canvasSize, canvasSize);
  ellipseMode(CENTER);
  colorMode(RGB, numOfSquares, numOfSquares, numOfSquares);

  for (let i = 0; i < numOfSquares; i++) {
    for (let j = 0; j < numOfSquares; j++) {
      squares.push(new Square(i, j));
    }
  }
}

function draw() {
  background(0);
  squares.forEach(square => {
    square.updateAngle(mouseX, mouseY);
    square.render();
  });
}

class Square {
  constructor(_i, _j) {
    this.i = _i;
    this.j = _j;
    this.s = squareSize;
    this.x = this.i * this.s + this.s/2; //transX
    this.y = this.j * this.s + this.s/2; //transY
    this.angle = 0;
  }

  updateAngle(_mx, _my) {
    let dx = _mx - this.x;
    let dy = _my - this.y;
    this.angle = atan2(dy, dx);
  }

  render() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    col = color(this.i, 0, numOfSquares - this.j);
    d = dist(mouseX, mouseY, this.x, this.y);
    this.s = map(d, 0, width, 10, squareSize);
    
    noFill();
    stroke(col);
    ellipse(0, 0, this.s, this.s);

    fill(255);
    noStroke();
    ellipse(this.s/4, 0, this.s/2, this.s/2);
    pop();
  }
}
