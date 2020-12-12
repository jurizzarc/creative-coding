function setup() {
  createCanvas(500, 500);
  background(224);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let startColor = color(360, 100, 100);
      let endColor = color(180, 100, 100);
      let c = lerpColor(startColor, endColor, x/10);
      noStroke();
      fill(c);
      rect(x * 50 + 10, y * 50 + 10, 20, 20);
    }
  }
}
