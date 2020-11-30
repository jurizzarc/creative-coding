const numOfSegments = 360;
const radius = 165;
const pathSize = radius + 130;
const swatches = 372;
const swatchHeight = 210;
const patternCanvas = 500;
const margin = 50;
let h = 360;
let s = 100;
let b = 100;
let amplitude = 30;
let length = 3;
let centerX, centerY, stepAngle;
let point1, point2;
let col1, col2;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(245);
  angleMode(DEGREES);
  colorMode(HSB, h, s, b);
  // noLoop();

  stepAngle = floor(h/numOfSegments);
  centerX = 230;
  centerY = 230;

  point1 = new Point(270);
  point2 = new Point(90);
}

function draw() {
  push();
  translate(centerX, centerY);

  beginShape(TRIANGLE_FAN);
  vertex(0, 0);
  for (let angle = 0; angle <= h; angle += stepAngle) {
    let vx = radius * cos(angle);
    let vy = radius * sin(angle);
    noStroke();
    fill(angle, s, b);
    vertex(vx, vy);
  }
  endShape();

  // strokeWeight(1);
  // stroke(255);
  // noFill();
  // ellipse(0, 0, pathSize, pathSize);

  pop();

  point1.render();
  point2.render();

  getColor();
  generatePattern();
}

function mousePressed() {
  point1.clicked();
  return false;
}

function mouseDragged() {
  if (point1.isActive) {
    point1.update(mouseX, mouseY);
    point1.x = centerX - round(cos(point1.a) * pathSize/2);
    point1.y = centerY - round(sin(point1.a) * pathSize/2);
    point2.a = (point1.a + 180) % 360;
    point2.x = centerX - round(cos(point2.a) * pathSize/2);
    point2.y = centerY - round(sin(point2.a) * pathSize/2);
  }
  return false;
}

function getColor() {
  colorMode(RGB);
  col1 = color(get(point1.x, point1.y));
  col2 = color(get(point2.x, point2.y));

  noStroke();
  //fill(0);
  //rect(margin, height - swatchHeight, swatches, swatchHeight - margin);
  fill(col1);
  rect(margin, height - swatchHeight, swatches/2, swatchHeight - margin);
  fill(col2);
  rect(swatches/2 + margin, height - swatchHeight, swatches/2, swatchHeight - margin);

  colorMode(HSB);
}

function generatePattern() {
  let startX = width - patternCanvas - margin + 2;
  let startY = margin * 2;

  length = map(mouseX, 0, width, 3, 8);
  amplitude = map(mouseY, height, 0, 5, 40);

  strokeWeight(3);
  stroke(0);
  fill(245);
  rect(width - patternCanvas - margin, margin * 2, patternCanvas, patternCanvas);

  let col1h = hue(col1);
  let lighter = color(col1h, 35, 100);
  setGradient(startX, startY + 2, patternCanvas - 4, patternCanvas - 4, lighter, col1);

  strokeWeight(3);
  stroke(col2);
  for (let j = startX; j < width - margin; j++) {
    point(j, startY + 40 + sin(j * length) * amplitude);
  }

  for (let j = startX; j < width - margin; j++) {
    point(j, startY + 100 + sin(j * length) * amplitude);
  }

  for (let j = startX; j < width - margin; j++) {
    point(j, startY + 160 + sin(j * length) * amplitude);
  }

  for (let j = startX; j < width - margin; j++) {
    point(j, startY + 220 + sin(j * length) * amplitude);
  }

  for (let j = startX; j < width - margin; j++) {
    point(j, startY + 280 + sin(j * length) * amplitude);
  }

  for (let j = startX; j < width - margin; j++) {
    point(j, startY + 340 + sin(j * length) * amplitude);
  }

  for (let j = startX; j < width - margin; j++) {
    point(j, startY + 400 + sin(j * length) * amplitude);
  }

  for (let j = startX; j < width - margin; j++) {
    point(j, startY + 460 + sin(j * length) * amplitude);
  }
}

function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let amount = map(i, y, y + h, 0, 1);
    let colour = lerpColor(c1, c2, amount);
    stroke(colour);
    line(x, i, x + w, i);
  }
}

class Point {
  constructor(_a) {
    this.a = _a;
    this.x = centerX + round(cos(this.a) * pathSize/2);
    this.y = centerY + round(sin(this.a) * pathSize/2);
    this.r = 12;
    this.c = color(0, 0, 100);
    this.isActive = false;
  }

  clicked() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.r/2) {
      // console.log('clicked');
      this.isActive = true;
      this.c = color(0, 0, 0);
    } else {
      this.isActive = false;
      this.c = color(0, 0, 100);
    }
  }

  update = function(mx, my) {
    console.log('updating');
    let deltaX = mx - this.x;
    let deltaY = my - this.y;
    this.a = atan2(deltaY, deltaX);
  }

  render() {
    strokeWeight(2);
    stroke(this.c);
    noFill();
    ellipse(this.x, this.y, this.r, this.r);
  }
}
