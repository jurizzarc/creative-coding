<!-- # Creative Coding CA1 – Wrapping Paper

![Screenshot of the Canvas](https://github.com/IADT-John-Montayne/shape-pattern-jurizzarc/blob/master/Main%20Exercises/wrapping-paper/canvas_screenshot.png)

**To customise the wrapping paper**
- Press the right arrow key to change the colour palette.
- Use the GUI on the upper right side of the screen. *showGrid* displays the cells where each thread is drawn in. *showIndex* displays the index number of each cell. You can select the type of basic weave pattern from the *weaveTypes* select element. The width or height of the cell is divided by the *threadSize*. *hasBlendMode* applies the blendMode(MULTIPLY), and blends the colours of the thread.
- To save the pattern, right click on the canvas, and select *Save Image As...*

---

Samples of weave patterns are in the *samples* folder. -->

# Wrapping Paper (Final)
Project - 24 Nov 2020

For our first assignment, we created a wrapping paper pattern using the p5.js library that will be printed out on an A3 sheet of paper. The pattern I made was inspired by the basic types of weaving patterns: plain, twill, and satin.

The canvas contains a grid, and this grid is made up of 100 grid cells. A warp and a weft thread is drawn on each grid cell. On the canvas, the warp threads look like vertical rectangles, while the weft threads look like horizontal rectangles. Depending on the type of weaving pattern chosen by the user, the warp is either drawn over the weft, or it is drawn under the weft. The grid and the threads are objects created from a class called *Thread*.

The properties of an object created from the *Thread* class are the index numbers *i* and *j*, the width and height of the cell, and the size of the thread. 

```
class Thread {
    constructor(_i, _j) {
        this.i = _i;
        this.j = _j;
        this.cw = cellWidth;
        this.ch = cellHeight;
        this.ts = threadSize;
    }
}
```

The width and height of the grid cell depend on the width and height of the canvas and the number of grid cells. The following variables are defined globally.

```
const canvasWidth = 1754;
const canvasHeight = 2481;
let numOfCells = 10;
let cellWidth = canvasWidth / numOfCells;
let cellHeight = canvasHeight / numOfCells;
```

To create the thread objects, I first initialised an empty array in a global variable *threads*, and the number of cells is set to 10.

```
let threads = [];
let numOfCells = 10;
```

I then populate the *threads* array in *setup()* with the objects made from the *Thread* class. The array now holds 100 objects.

```
for (let i = 0; i < numOfCells; i++) {
    for (let j = 0; j < numOfCells; j++) {
        threads.push(new Thread(i, j));
    }
}
```