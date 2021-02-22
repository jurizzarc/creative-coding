# Exercise 14: Growth
The sketch shows a ircle with a random radius and colour is drawn on the canvas and positioned next to the circle that is closest to it.

## Creating the first circle
A circle object created from the class `Circle` has the following properties. This class takes values for the x and y coordinates and the radius. The `colorMode()` is set to HSB and the random colour that is generated is a shade of red.
```javascript
class Circle {
    constructor(_x, _y, _r) {
        this.coordinates = createVector(_x, _y);
        this.radius = _r;
        this.colour = color(360, floor(random(75, 100)), floor(random(70, 100)));
    }
}
```

The first circle is positioned at the centre of the canvas. This object is inserted into the `circles` array which is used to store all the circles that are drawn on the canvas.
```javascript
let circles;
let minRadius = 5;
let maxRadius = 10;
let circle0;

function setup() {
    [...]
    circle0 = new Circle(width/2, height/2, maxRadius);
    circles.push(circle0);
}
```

## Creating the other circles
The `addCircle()` function creates a new circle object each time `draw()` runs. At first, the circles that are created are given random `x` and `y` positions. 
```javascript
function draw() {
    background(217, 0, 100);
    addCircle();
}

function addCircle() {
    let randX = random(width);
    let randY = random(height);
    let randR = floor(random(minR, maxR));
    // Create a circle
    let newC = new Circle(randX, randY, randR);
    circles.push(newC);
}
```

## Drawing the circle
The `render()` method of class `Circle` draws an ellipse and is called on each circle object.
```javascript
class Circle {
    [...]
    render() {
        noStroke();
        fill(this.colour);
        ellipse(this.coordinates.x, this.coordinates.y, this.radius*2, this.radius*2);
    }
}

function draw() {
    [...]
    circles.forEach(circle => {
    circle.render();
    });
}
```

Since the algorithm that places the circle to the shape nearest to it has not been applied yet, the circles are positioned randomly on the canvas.

## Finding the closest circle
The Euclidean Distance is used to find the closest circle. The distance between the points of the circle `newC` and the other circle `otherC` is calculated using `p5.Vector.dist()`. The circle with the lowest distance is the closest circle. The following code is added before adding the new circle to the array.
```javascript
function addCircle() {
    [...]
    let closestDistance;
    let closestIndex;
    for (let i = 0; i < circles.length; i++) {
        let otherC = circles[i];
        // Calculate Euclidean Distance between two points
        let distance = newC.coordinates.dist(otherC.coordinates);
        if (closestDistance == undefined || distance < closestDistance) {
            closestIndex = i;
            closestDistance = distance;
        }
    }
}
```

After looping through the `circles` array, the `dock()` method is called on `newC` to update its x and y coordinates, placing it to the closest circle. 
```javascript
class Circle {
    [...]
    dock(_other) {
        // Get distances between the coordinates of this circle and the other circle
        let distanceVect = p5.Vector.sub(this.coordinates, _other.coordinates);
        // Get angle of rotation for this vector
        let angle = distanceVect.heading();
        let moveDistance = distanceVect.mag() - this.radius - _other.radius;
        // Update x and y coordinates of this circle
        this.coordinates.x = this.coordinates.x - cos(angle) * moveDistance;
        this.coordinates.y = this.coordinates.y - sin(angle) * moveDistance;
    }
}

function addCircle() {
    [...]
    newC.dock(circles[closestIndex]);
    circles.push(newC);
}
```

The circle that is created each time `draw()` runs is now placed next to the circle that is closest to it.