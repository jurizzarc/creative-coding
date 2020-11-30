let numOfSegments, stepAngle, radius;

function setup() {
  createCanvas(500, 500);
  background(224);

  centerX = width/2;
  centerY = height/2;
  numOfSegments = 12;
  stepAngle = TWO_PI/numOfSegments;
  radius = 100;
}

function draw() {
  push();
  translate(centerX, centerY);
  beginShape(TRIANGLE_FAN);
  vertex(0, 0);
  for (let i = 0; i <= TWO_PI; i += stepAngle) {
    let vx = (radius * cos(i));
    let vy = (radius * sin(i));
    strokeWeight(2);
    stroke(0);
    line(0, 0, vx, vy);
  }
  endShape();
  pop();
}
