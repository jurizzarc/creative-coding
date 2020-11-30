function setup() {
  createCanvas(500, 500);
  background(0);
  colorMode(HSB, width, height, 100); // colorMode(MODE, range for the hue/red, range for the saturation/green, range for the brightness/blue)
  noStroke();
}

function draw() {
  let stepX = mouseX + 1;
  let stepY = mouseY + 1;

  for (let gridX = 0; gridX < width; gridX += stepX) {
    for (let gridY = 0; gridY < height;  gridY += stepY) {
      fill(gridX, height - gridY, 100);
      rect(gridX, gridY, stepX, stepY);
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    // console.log('it works');
    saveCanvas(gd.timestamp(), 'png'); // save canvas as an image
  }
}
