let numOfSegments, stepAngle, centerX, centerY, radius;

function setup() {
  createCanvas(500, 500);
  background(224);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
  noStroke();
}

function draw() {
  numOfSegments = map(mouseX, 0, width, 20, 60); // convert mouseX from a value ranging from 0 to width into a value ranging from 20 to 60
  stepAngle = 360/numOfSegments;
  centerX = width/2;
  centerY = height/2;
  radius = 100;

  push();
  translate(centerX, centerY);
    beginShape(TRIANGLE_FAN);
      vertex(0, 0);
      for (let i = 0; i <= 360; i += stepAngle) {
        let vx = radius * cos(i);
        let vy = radius * sin(i);
        fill(i, 100, 100);
        vertex(vx, vy);
      }
    endShape();
  pop();
}
