class Point {
    constructor(_x, _y) {
        this.coordinates = createVector(_x, _y);
    }

    drawEllipse() {
        noStroke();
        fill(color);
        ellipse(this.coordinates.x, this.coordinates.y, 5);
    }

    drawLine(_index) {
        stroke(color);
        line(this.coordinates.x, this.coordinates.y, points[_index].coordinates.x, points[_index].coordinates.y);
    }

    drawCurveVertex() {
        curveVertex(this.coordinates.x, this.coordinates.y);
    }
}