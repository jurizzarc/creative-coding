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

The following are also global variables that are needed to create the threads.

```
const colorPalettes = [
    ['#900C3E', '#50163F', '#FF5835', '#A90031'],
    ['#B41D01', '#960000', '#FFCB18', '#FCB600'],
    ['#DB1C1A', '#AE1417', '#3E8B54', '#2E5033'],
    ['#004445', '#011C1D', '#6FB98F', '#2C7873']
];
let colorIndex = [0, 1, 2, 3];
let paletteIndex = 0;
let currentPalette;
let weaveType = 'Plain';
let threadSize = 3;
```

*colorPalettes* holds an array of colour palettes for the pattern, each defined as an array of 4 hex values. *colorIndex* holds an array of the index position of the hex values. *paletteIndex* refers to the index position of the colour palette that is used on the canvas. The value stored in *currentPalette* changes then the user presses the right arrow key. This is one of the ways the user can interact with the canvas.

```
function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        paletteIndex = (paletteIndex + 1) % colorPalettes.length;
    } 
    redraw();
}
```

To create the thread objects, I first initialised an empty array in a global variable *threads*, and the number of cells is set to 10.

```
let threads = [];
let numOfCells = 10;
```

I then populate the *threads* array in *setup()* with the objects made from the *Thread* class. The array now holds 100 objects.

```
function setup() {
    createCanvas(canvasWidth, canvasHeight);
    rectMode(CENTER);
    smooth();
    noLoop();

    for (let i = 0; i < numOfCells; i++) {
        for (let j = 0; j < numOfCells; j++) {
            threads.push(new Thread(i, j));
        }
    }
}
```

In the *Thread* class, I created a method called *render()*. When called, this method displays the grid and the weave pattern on the canvas. I made use of transformations so that each object made from the *Thread* class gets drawn within the canvas. 

In the code snippet below, the *render()* method generates a transparent square that has a black outline within the canvas. The point of origin is set to the x and y coordinates of the grid cell, added to half the width and height of the grid cell. Those values are added because *rectMode* is set to CENTER. Without those values, the grid would be positioned slightly off the canvas.

```
render() {
    push();
    let cellX = this.i * this.cw + this.cw / 2;
    let cellY = this.j * this.ch + this.ch / 2;
    translate(cellX, cellY);
    noFill();
    stroke('#000');
    rect(0, 0, this.cw, this.ch);
    pop();
}
```

Weave is the interlacing of warp and weft threads at right angles in order to produce a woven fabric. To imitate this in p5.js, I started with the simplest of all basic weaves which is the plain weave. The plain weave is made by interlacing warp and weft threads in an alternate manner.

The purpose of the index numbers that are set to the *this.i* and *this.j* properties is so that I can assign each grid cell with a number and to make sure that the warp and weft threads will be interlaced on the canvas depending on the type of weave chosen by the user. 

Initially, each grid cell were assigned two numbers, but to make the calculations easier, I added these two numbers together. For example, if a grid cell's *i* index number is 1 and its *j* index number is also 1 (1, 1) then its index number is 2. In the *render()* method, I added the following line of code before *pop()*.

```
let indexNum = this.i + this.j;
```

To position the threads in the center of a grid cell, the value set to the *this.ts* property is multiplied to 2. I stored the product in the variable *threadPos*. This value will be later divided to the height or width of the grid cell. 