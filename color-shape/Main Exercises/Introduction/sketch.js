function setup() {
  createCanvas(500, 500);
  background(0);
  colorMode(HSB, width, height, 100); // colorMode(MODE, range for the hue/red, range for the saturation/green, range for the brightness/blue)
  noStroke();
}

function draw() {
  // noStroke();
  // fill(255, 0, 0);
  // rect(20, 20, 100, 100);
  // ellipseMode(CORNER);
  // fill(0, 255, 0);
  // ellipse(20, 140, 100, 100);
  //
  // strokeWeight(5);
  // stroke(255);
  // line(20, 300, 60, 300);
  //
  // stroke(0, 0, 255);
  // strokeWeight(8);
  // point(20, 400);

  // for (let i = 0; i < 10; i++) {
  //   fill(255);
  //   rect(i*50, 20, 30, 30);
  // }

  let step = 10;

  for (let gridX = 0; gridX < width; gridX += step) {
    for (let gridY = 0; gridY < height;  gridY += step) {
      fill(gridX, height - gridY, 100);
      rect(gridX, gridY, 20, 20);
    }
  }
}
