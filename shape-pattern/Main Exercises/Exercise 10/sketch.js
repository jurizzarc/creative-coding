let squares = [];
let canvasSize = 500;
let numOfSquares = 20;
let squareSize = canvasSize/numOfSquares;
let start, end, val, col, col2, d, randomNum;

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
  randomSeed(23);
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

    col = color(this.i, 0, numOfSquares - this.j);
    col2 = color(this.i, 0, numOfSquares - this.j, 175);

    strokeWeight(this.sw);
    stroke(col);
    randomNum = round(random(0, 1));
    if (randomNum == 0) {
      // line(0, this.s, this.s, 0);
      fill(col);
      beginShape(TRIANGLES);
      vertex(0, 0);
      vertex(0, this.s);
      vertex(this.s, 0);
      endShape();

      fill(col2);
      beginShape(TRIANGLES);
      vertex(0, this.s);
      vertex(this.s, 0);
      vertex(this.s, this.s);
      endShape();
    } else {
      line(0, 0, this.s, this.s);
    }
    
    pop();
  }
}
