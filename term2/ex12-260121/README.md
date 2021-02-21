# Exercise 12: Random Angles
The sketch shows the direction of a point and how it bounces off the sides of the canvas at a random angle. The other point mirrors its movement.

## Moving the points
The first point initially moves in a diagonal direction using `sin()` and `cos()`.
```javascript
let stepSize = 1;
let angle = 45;
let x1, y1, x2, y2;

function setup() {
    [...]
    x1 = 0;
    y1 = 0;
}

function draw() {
    let speed = map(mouseX, 0, width, 2, 8);
    for (let i = 0; i < speed; i++) {
    x1 += cos(radians(angle)) * stepSize;
    y1 += sin(radians(angle)) * stepSize;
    stroke('#2FC6D0');
    strokeWeight(2);
    point(x1, y1);
    }
}
```

The other point mirrors the first point's movement by taking away its current position from the width and height of the canvas.
```javascript
for (let i = 0; i < speed; i++) {
    [...]
    x2 = width - x1;
    y2 = height - y1;
    stroke('#D0392F');
    point(x2, y2);
}
```

## Checking if the point is outside of the canvas
The point bounces at a random angle when it reaches an edge of the canvas. There is control over how this angle is generated.
```javascript
let angleCount = 5;

function draw() {
    [...]
    if (x1 < 0 || x1 > width || y1 < 0 || y1 > height) angle = getRandomAngle(x1, y1);
}

function getRandomAngle(_x, _y) {
    let randomAngle = (floor(random(-angleCount, angleCount)) + 0.5) * 90 / angleCount;
    if (_x > width) return randomAngle + 180;
    if (_x < 0) return randomAngle;
    if (_y > height) return randomAngle - 90;
    if (_y < 0) return randomAngle + 90;
}
```