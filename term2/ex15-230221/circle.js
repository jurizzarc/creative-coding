class Circle {
    constructor(_x, _y, _r) {
        this.coordinates = createVector(_x, _y);
        this.radius = _r;
        this.isGrowing = true;
    }

    // Increases radius 
    grow() {
        if (this.isGrowing) this.radius += 0.05;
    }

    // Checks if circle reaches an edge of the canvas
    hitsEdges() {
        return (
            this.coordinates.x - this.radius <= 0 ||
            this.coordinates.x + this.radius >= width ||
            this.coordinates.y - this.radius <= 0 ||
            this.coordinates.y + this.radius >= height
        );
    }

    render() {
        noFill();
        stroke(0);
        strokeWeight(2);
        ellipse(this.coordinates.x, this.coordinates.y, this.radius*2);
    }
}