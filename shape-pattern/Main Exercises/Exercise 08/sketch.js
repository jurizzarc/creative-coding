let squares = [];
let canvasSize = 500;
let numOfSquares = 20;
let squareSize = canvasSize/numOfSquares;
let start, end, val, col, d, randomNum;

function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, numOfSquares, numOfSquares, numOfSquares);
  //noLoop();

  for (let i = 0; i < numOfSquares; i++) {
    for (let j = 0; j < numOfSquares; j++) {
      squares.push(new Square(i, j));
    }
  }
}

function draw() {
  background(0);
  randomSeed(10);
  squares.forEach(square => {
    square.render();
  });
}

class Square {
  constructor(_i, _j) {
    this.i = _i;
    this.j = _j;
    this.s = squareSize;
    this.x = this.i * this.s; //transX
    this.y = this.j * this.s; //transY
    this.sw = 1;
  }

  render() {
    push();
    translate(this.x, this.y);

    d = dist(mouseX, mouseY, this.x, this.y);
    this.sw = map(d, 0, width, 2, 7);
    col = color(this.i, 0, numOfSquares - this.j);
    strokeWeight(this.sw);
    stroke(col);
    randomNum = round(random(0, 1));
    if (randomNum == 0) {
      line(0, this.s, this.s, 0);
    } else {
      line(0, 0, this.s, this.s);
    }
    
    pop();
  }
}
