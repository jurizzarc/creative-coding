let shapes = [];
let canvasSize = 500;
let numOfShapes = 20;
let shapeSize = canvasSize/numOfShapes;
let col, randomNum;

function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, numOfShapes, numOfShapes, numOfShapes);
  //noLoop();

  for (let i = 0; i < numOfShapes; i++) {
    for (let j = 0; j < numOfShapes; j++) {
      shapes.push(new Shape(i, j));
    }
  }
}

function draw() {
  background(0);
  randomSeed(23);
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
  }

  render() {
    push();
    translate(this.x, this.y);
    
    col = color(this.i, 0, numOfShapes - this.j);
    randomNum = round(random(0, 1));
    if (randomNum == 0) {
      noStroke();
      fill(col);
      beginShape(TRIANGLES);
      vertex(0, 0);
      vertex(0, this.s);
      vertex(this.s, 0);
      endShape();
    } else {
      strokeWeight(1);
      stroke(col);
      line(0, 0, this.s, this.s);
    }
    
    pop();
  }
}
