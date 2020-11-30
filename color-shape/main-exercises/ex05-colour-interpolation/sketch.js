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

  for (let x = 0; x < 10; x++) {
    let startColor = color(360, 100, 100);
    let endColor = color(180, 100, 100);
    let c = lerpColor(startColor, endColor, x/10);
    noStroke();
    fill(c);
    rect(x * 50 + 10, 30, 20, 20);
  }
}
