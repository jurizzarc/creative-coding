class CustomShape {
    constructor(_x, _y, _radius, _fillColor, _strokeColor) {
        this.coordinates = createVector(_x, _y);
        this.radius = _radius;
        this.fillColor = _fillColor;
        this.strokeColor = _strokeColor;
    }

    drawEllipses() {
        for (let i = 0; i < numOfSegments; i++) {
            noStroke();
            fill(this.fillColor);
            this.coordinates.x = this.radius * cos(angle*i);
            this.coordinates.y = this.radius * sin(angle*i);
            ellipse(this.coordinates.x, this.coordinates.y, 5, 5);
        }
    }

    drawVertices() {
        push();
        translate(this.coordinates.x, this.coordinates.y);
        noFill();
        stroke(this.strokeColor);
        beginShape();
        for (let a = 0; a < points.length; a++) {
            
        }
        endShape();
        pop();
    }
}