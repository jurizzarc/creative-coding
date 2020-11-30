let shapes = [];
let circles = [];
let canvasSize = 500;
let numOfShapes = 5;
let numOfCirles = numOfShapes + 1;
let squareSize = canvasSize/numOfShapes;
let col;

function setup() {
  createCanvas(canvasSize, canvasSize);
  rectMode(CENTER);
  colorMode(RGB, numOfShapes, numOfShapes, numOfShapes);

  for (let i = 0; i < numOfShapes; i++) {
    for (let j = 0; j < numOfShapes; j++) {
      shapes.push(new Shape(i, j));
    }
  }

  for (let i = 0; i < numOfCirles; i++) {
    for (let j = 0; j < numOfCirles; j++) {
      circles.push(new Circle(i, j));
    }
  }
}

function draw() {
  background('#f5f0ea');
  shapes.forEach(shape => {
    shape.render();
  });
  circles.forEach(circle => {
    circle.render();
  });
}

class Shape {
  constructor(_i, _j) {
    this.i = _i;
    this.j = _j;
    this.s = squareSize;
    this.x = this.i * this.s; //transX
    this.y = this.j * this.s; //transY
  }

  render() {
    push();
    translate(this.x + this.s/2, this.y + this.s/2);
    col = color(0);
    
    noFill();
    stroke(col);
    rect(0, 0, this.s, this.s);
    pop();

    push();
    translate(this.x, this.y);

    noStroke();
    // upper
    fill('#ef162f');
    arc(this.s/2, 0, this.s, this.s/2, 0, 1 * PI);
    // lower
    fill('#00bebc');
    arc(this.s/2, this.s, this.s, this.s/2, 1 * PI, 0);
   
    // left
    fill('#ff8b95');
    arc(0, this.s/2, this.s/2, this.s, 1.5 * PI, 0.5 * PI);

    // right
    fill('#9db928');
    arc(this.s, this.s/2, this.s/2, this.s, 0.5 * PI, 1.5 * PI);

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
    col = color('#ff9000');
    
    fill('#ff9000');
    strokeWeight(3);
    stroke('#fff');
    ellipse(0, 0, this.s/2, this.s/2);

    pop();
  }
}
