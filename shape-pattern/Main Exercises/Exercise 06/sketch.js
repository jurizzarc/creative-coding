let numOfSegments, stepAngle, radius;

function setup() {
  createCanvas(500, 500);
  background(224);

  centerX = width/2;
  centerY = height/2;
}

function draw() {
  background(224);

  radius = map(mouseX, 0, width, -200, 200);
  numOfSegments = map(mouseY, 0, height, 12, 90);
  stepAngle = TWO_PI/numOfSegments;

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
