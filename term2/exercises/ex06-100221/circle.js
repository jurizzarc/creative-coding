class Circle {
    constructor(_x, _y, _r) {
        this.coordinates = createVector(_x, _y);
        this.radius = _r;
        this.colour = color(floor(random(0, 20)), floor(random(70, 90)), floor(random(80, 100)));
    }

    render() {
        stroke(this.colour);
        noFill();
        ellipse(this.coordinates.x, this.coordinates.y, this.radius*2, this.radius*2);
    }

    dock(_other) {
        let vectorDiff = p5.Vector.sub(this.coordinates, _other.coordinates);
        let angle = vectorDiff.heading();
        let distance = vectorDiff.mag() - this.radius - _other.radius;
        this.coordinates.x = this.coordinates.x - cos(angle) * distance;
        this.coordinates.y = this.coordinates.y - sin(angle) * distance;
    } 
}