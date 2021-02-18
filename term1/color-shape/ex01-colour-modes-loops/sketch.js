function setup() {
  createCanvas(500, 500);
  background(0);
  colorMode(HSB, width, height, 100); // colorMode(MODE, range for the hue/red, range for the saturation/green, range for the brightness/blue)
  noStroke();
}

function draw() {
  let step = 10;

  for (let gridX = 0; gridX < width; gridX += step) {
    for (let gridY = 0; gridY < height;  gridY += step) {
      fill(gridX, height - gridY, 100);
      rect(gridX, gridY, 20, 20);
    }
  }
}
