# Exercise 13: Curve Vertex and Noise
Using other built in functions of the p5.js library to draw a circle. Perlin Noise is also applied to animate the curve vertex coordinates.

## Creating the points
An object or point created from the class `Point` has a single initial property that describes its x and y positions on the canvas. This is stored in a vector.
```javascript
class Point {
    constructor(_x, _y) {
        this.coordinates = createVector(_x, _y);
    }
}
```

To set the initial positions of each point for drawing the circle, the angle is varied and trigonometry is used to calculate where the x and y position of the point would be for that angle. x would be `cos(angle)` and y would be `sin(angle)`. These values are multipled by the radius as the circle is large. Each point object is stored in an array.
```javascript
let numOfSegments = 180;
let points = [];
let radius, angle;

function setup() {
    [...]
    radius = 150;
    angle = radians(360/numOfSegments);
    for (let i = 0; i < numOfSegments; i++) {
    let xPos = radius * cos(angle*i);
    let yPos = radius * sin(angle*i);
    points.push(new Point(xPos, yPos));
    }
}
```

## Drawing points around a circle
The method `drawEllipse()` is called on each point object, which draws a small ellipse on the canvas.
```javascript
class Point {
    [...]
    drawEllipse() {
        noStroke();
        fill('#00C2BA');
        ellipse(this.coordinates.x, this.coordinates.y, 5);
    }
}

function draw() {
    background('#000');
    push();
    // Move origin to the centre
    translate(width/2, height/2);
    points.forEach(point => {
        point.drawEllipse();
    });
    pop();
}
```

## Using line() to draw a circle
Another way of creating a circle is by using the `line()` method. The `drawLine()` method of class `Point` takes an index number. This method draws a line starting from the x and y points of the point object calling it to the x and y positions of the point that matches the index number passed to the method. The `drawLines()` function takes an array and draws the lines that will form the circle.
```javascript
class Point {
    [...]
    drawLine(_index) {
        stroke('#00C2BA');
        line(this.coordinates.x, this.coordinates.y, points[_index].coordinates.x, points[_index].coordinates.y);
    }
}

function draw() {
    [...]
    drawLines(points);
    pop();
}

function drawLines(_array) {
    for (let i = 0; i < _array.length - 1; i++) {
        _array[i].drawLine(i+1);
    }
    line(_array[_array.length-1].coordinates.x, _array[_array.length-1].coordinates.y,
    _array[0].coordinates.x, _array[0].coordinates.y);
}
```

The higher the amount of segments is, the closer the shape resembles a circle. In the image below, the shape is made up of 180 segments.

## Using curveVertex() to draw a circle
The `curveVertex()` method is used in conjunction with `beginShape()` and `endShape()`. The `drawCurveVertex()` method creates a vertex coordinate for the circle. The `drawCurveVertices()` function draws the curve vertex coordinates taken from an array and these values will form the circle. The first and last curve vertex points guide the beginning and end of the curve.
```javascript
class Point {
    [...]
    drawCurveVertex() {
        curveVertex(this.coordinates.x, this.coordinates.y);
    }
}

function draw() {
    [...]
    drawCurveVertices(points);
    pop();
}

function drawCurveVertices(_array) {
    noFill();
    stroke(color);
    beginShape();
    // first controlled points
    curveVertex(_array[_array.length-1].coordinates.x, _array[_array.length-1].coordinates.y);
    curveVertex(_array[_array.length-1].coordinates.x, _array[_array.length-1].coordinates.y);
    _array.forEach(item => {
        item.drawCurveVertex();
    });
    // last controlled points
    curveVertex(_array[0].coordinates.x, _array[0].coordinates.y);
    curveVertex(_array[0].coordinates.x, _array[0].coordinates.y);
    endShape();
}
```

## Adding Perlin Noise
The points that form the circle move by using noise values. The cosine and sine of `i` goes between -1 and 1 and this is mapped to a value ranging between 0 and `maxNoise` which in this sketch is set to 7. The third dimension of the noise space or `z` is incrementing and shows the Perlin Noise space over time. The `animatePoints()` function is called before `drawCurveVertices()` and updates the initial x and y positions of each point every time `draw()` runs.
``` javascript
function animatePoints() {
    points = [];
    z += 0.01;
    for (let i = 0; i < numOfSegments; i++) {
        let x = map(cos(i), -1, 1, 0, maxNoise);
        let y = map(sin(i), -1, 1, 0, maxNoise);
        let n = noise(x, y, z);
        let xPos = radius * cos(angle*i) * n;
        let yPos = radius * sin(angle*i) * n;
        points.push(new Point(xPos, yPos));
    }
}
```