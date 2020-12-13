let shapes = [];
let canvasSize = 500;
let numOfShapes = 20;
let shapeSize = canvasSize/numOfShapes;
let d, col, randomNum;

function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, numOfShapes, numOfShapes, numOfShapes);

  for (let i = 0; i < numOfShapes; i++) {
    for (let j = 0; j < numOfShapes; j++) {
      shapes.push(new Shape(i, j));
    }
  }
}

function draw() {
  background(0);
  randomSeed(10);
  shapes.forEach(shape => {
    shape.render();
  });
}

class Shape {
  constructor(_i, _j) {
    this.i = _i;
    this.j = _j;
    this.s = shapeSize;
    this.x = this.i * this.s; //transX
    this.y = this.j * this.s; //transY
    this.sw = 1;
  }

  render() {
    push();
    translate(this.x, this.y);

    d = dist(mouseX, mouseY, this.x, this.y);
    this.sw = map(d, 0, width, 2, 7);
    col = color(this.i, 0, numOfShapes - this.j);
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
