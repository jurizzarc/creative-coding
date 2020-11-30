<!-- **Introduction (23 Sep 20)**
- p5.js introduction (simple shapes and drawing)
- the uses of the Modulo % operator
- drawing rectangles using for loops
- colour theory. changing the colour mode from RGB to HSB with the colorMode() function -->

# Colour Modes and Loops
- Exercise 01 – 23 Sep 2020

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