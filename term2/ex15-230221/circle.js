class Circle {
    constructor(_x, _y, _r) {
        this.coordinates = createVector(_x, _y);
        this.radius = _r;
        this.isGrowing = true;
        let h = floor(random(190, 220));
        let s = floor(random(65, 80));
        let b = floor(random(70, 90));
        this.strokeC = color(h, s, b);
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
        strokeWeight(strokeW);
        stroke(this.strokeC);
        ellipse(this.coordinates.x, this.coordinates.y, this.radius*2);
    }
}