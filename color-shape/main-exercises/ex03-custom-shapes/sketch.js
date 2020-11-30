let numOfSegments, stepAngle, centerX, centerY, radius;

function setup() {
  createCanvas(500, 500);
  background(224);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  centerX = width/2;
  centerY = height/2;
  numOfSegments = 12;
  stepAngle = 360/numOfSegments;
  radius = 100;
}

function draw() {
  beginShape(TRIANGLE_FAN);
    vertex(centerX, centerY);
    for (let i = 0; i <= 360; i += stepAngle) {
      let vx = (radius * cos(i)) + centerX;
      let vy = (radius * sin(i)) + centerY;
      fill(i, 100, 100);
      vertex(vx, vy);
    }
  endShape();
}
