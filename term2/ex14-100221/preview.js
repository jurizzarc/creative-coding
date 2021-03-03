let s = function (p) {
    class Circle {
        constructor(_x, _y, _r) {
            this.coordinates = p.createVector(_x, _y);
            this.radius = _r;
            this.colour = p.color(360, p.floor(p.random(75, 100)), p.floor(p.random(70, 100)));
        }
        render() {
            p.noFill();
            p.stroke(this.colour);
            p.ellipse(this.coordinates.x, this.coordinates.y, this.radius*2, this.radius*2);
        }
        dock(_other) {
            // Get distances between the coordinates of this circle and the other circle
            let distanceVect = p5.Vector.sub(this.coordinates, _other.coordinates);
            // Get angle of rotation for this vector
            let angle = distanceVect.heading();
            let moveDistance = distanceVect.mag() - this.radius - _other.radius;
            // Update x and y coordinates of this circle
            this.coordinates.x = this.coordinates.x - p.cos(angle) * moveDistance;
            this.coordinates.y = this.coordinates.y - p.sin(angle) * moveDistance;
        }
    };
    let circles = [];
    let numOfCircles = 200;
    let minR = 5;
    let maxR = 10;
    let fc = 75;
    let circle0;
    p.setup = function() {
        let sketchW = document.getElementById('sketch').offsetWidth;
        let sketchH = document.getElementById('sketch').offsetHeight;
        let renderer = p.createCanvas(sketchW, sketchH);
        renderer.parent('sketch');
        p.colorMode(p.HSB);
        circle0 = new Circle(p.width/2, p.height/2, maxR);
        circles.push(circle0);
    };
    p.draw = function() {
        p.background(217, 0, 100);
        if (circles.length <= numOfCircles) {
            let randX = p.random(p.width);
            let randY = p.random(p.height);
            let randR = p.floor(p.random(minR, maxR));
            // Create a circle
            let circle = new Circle(randX, randY, randR);
            p.addCircle(circle);
        }
        circles.forEach(circle => {
            circle.render();
        });
    };
    p.addCircle = function(_newCircle) {
        let newC = _newCircle;
        let closestDistance, closestIndex;
        // Find closest circle by the distance
        for (let i = 0; i < circles.length; i++) {
            let otherC = circles[i];
            // Get distance between the coordinates of the circles
            let distance = newC.coordinates.dist(otherC.coordinates) - newC.radius - otherC.radius;
            // Do not include newC if it overlaps other circle
            if (distance < 0) return null;
            // The circle with the lowest distance is the closest
            if (closestDistance == undefined || distance < closestDistance) {
                closestIndex = i;
                closestDistance = distance;
            }
        }
        newC.dock(circles[closestIndex]);
        circles.push(newC); 
    }
};
new p5(s, 'sketch');