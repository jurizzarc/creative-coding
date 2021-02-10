class CustomShape {
    constructor(_i, _strokeColor) {
        this.i = _i;
        this.radius = radius;
        //this.fillColor = _fillColor;
        this.strokeColor = _strokeColor;
        this.numOfSegments = numOfSegments;
        this.angle = radians(360/this.numOfSegments);
        this.coordinates = createVector(this.radius * cos(this.angle*this.i), 
                                        this.radius * sin(this.angle*this.i));
    }

    drawEllipse() {
        noStroke();
        fill(this.fillColor);
        ellipse(this.coordinates.x, this.coordinates.y, 5, 5);
    }

    drawLine(_val) {
        stroke(this.strokeColor);
        line(this.coordinates.x, this.coordinates.y, 
            points[_val].coordinates.x, points[_val].coordinates.y);
    }

    drawCurveVertex() {
        noFill();
        stroke(strokeColor);
        curveVertex(this.coordinates.x, this.coordinates.y);
    }

    animate() {
        
    }
}