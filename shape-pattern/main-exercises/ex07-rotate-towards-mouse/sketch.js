let shapes = [];
let canvasSize = 500;
let numOfShapes = 20;
let shapeSize = canvasSize/numOfShapes;
let col, d;

function setup() {
  createCanvas(canvasSize, canvasSize);
  ellipseMode(CENTER);
  colorMode(RGB, numOfShapes, numOfShapes, numOfShapes);

  for (let i = 0; i < numOfShapes; i++) {
    for (let j = 0; j < numOfShapes; j++) {
      shapes.push(new Shape(i, j));
    }
  }
}

function draw() {
  background(0);
  shapes.forEach(shape => {
    shape.updateAngle(mouseX, mouseY);
    shape.render();
  });
}

class Shape {
  constructor(_i, _j) {
    this.i = _i;
    this.j = _j;
    this.s = shapeSize;
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

    col = color(this.i, 0, numOfShapes - this.j);
    d = dist(mouseX, mouseY, this.x, this.y);
    this.s = map(d, 0, width, 10, shapeSize);
    
    noFill();
    stroke(col);
    ellipse(0, 0, this.s, this.s);

    fill(255);
    noStroke();
    ellipse(this.s/4, 0, this.s/2, this.s/2);
    pop();
  }
}
