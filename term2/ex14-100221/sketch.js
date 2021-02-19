let s = function (p) {
    class Circle {
        constructor(_x, _y, _r) {
            this.coordinates = p.createVector(_x, _y);
            this.radius = _r;
            this.colour = p.color(p.floor(p.random(0, 20)), 100, p.floor(p.random(75, 100)));
        }
        render() {
            p.noStroke();
            p.fill(this.colour);
            p.ellipse(this.coordinates.x, this.coordinates.y, this.radius*2, this.radius*2);
        }
        dock(_other) {
            // Get distances between the coordinates of this and the other circle
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
    let minR = 6;
    let maxR = 15;
    let fc = 50;
    let circle0;
    p.setup = function() {
        let sketchW = document.getElementById('sketch').offsetWidth;
        let sketchH = document.getElementById('sketch').offsetHeight;
        let renderer = p.createCanvas(sketchW, sketchH);
        renderer.parent('sketch');
        p.colorMode(p.HSB);
        p.frameRate(2);
        circle0 = new Circle(p.width/2, p.height/2, maxR);
        circles.push(circle0);
    };
    p.draw = function() {
        p.background('#fff');
        p.addCircle();
        circles.forEach(circle => {
            circle.render();
        });
        if (p.frameCount >= fc) p.noLoop();
    };
    p.addCircle = function() {
        let randX = p.random(p.width);
        let randY = p.random(p.height);
        let randR = p.floor(p.random(minR, maxR));
        // Create a circle
        let newC = new Circle(randX, randY, randR);
        let closestDistance;
        let closestIndex;
        // Find closest circle by the distance
        for (let i = 0; i < circles.length; i++) {
            let otherC = circles[i];
            // Get distance between the coordinates of the circles
            let distance = newC.coordinates.dist(otherC.coordinates);
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