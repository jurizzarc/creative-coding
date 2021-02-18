# Colour Modes and Loops
Exercise 01 – 23 Sep 2020

### Introduction to p5
Initial environment properties such as the width and height of the canvas, background colour, and colour mode are defined in the *setup()* function. This function is only called once when the program starts.

In the code block below, the canvas has a width and height of 500 pixels, and the background colour is black.
```
function setup() {
    createCanvas(500, 500);
    background(0);
}
```

Simple shapes are drawn on the canvas by using p5 functions such as *fill()*, *stroke()*, *strokeWeight()*, *ellipse()*, *line()*, and *rect()* in the *draw()* function. This function runs continuously unless *noLoop()* is called in *setup()* or the program is stopped.

For example, to draw a red square that is at location (20, 20) with a width and height of 100 pixels and has no stroke:
```
function draw() {
    noStroke();
    fill(255, 0, 0);
    rect(20, 20, 100, 100);
}
```

### Colour Mode
By default, the parameters passed for *fill()*, *stroke()*, and *background()* functions are defined by values between 0 and 255 using the RGB colour model. To use the HSB colour system, Setting *colorMode(HSB)* in the *setup()* function changes the way p5.js interprets colour data.

In the code snippet below, the colour mode is set to HSB. The range for the hue is set to the width of the canvas. The range for the saturation is set to the height of the canvas, and the range for the brightness is set to 100.

`colorMode(HSB, width, height, 100)`

### Multi-coloured tile grid
One way of creating a tile grid that has different colours is by drawing squares on the canvas with a nested for loop, and setting the colour of each square to its position on the canvas.

```
function draw() {
    let step = 10;
    for (let gridX = 0; gridX < width; gridX += step) {
    for (let gridY = 0; gridY < height;  gridY += step) {
      fill(gridX, height - gridY, 100);
      rect(gridX, gridY, 20, 20);
    }
  }
}
```