class Circle {
    constructor(_x, _y, _r) {
        this.coordinates = createVector(_x, _y);
        this.radius = _r;
        this.colour = colorPalette[1];
    }

    render() {
        noStroke();
        fill(this.colour);
        ellipse(this.coordinates.x, this.coordinates.y, this.radius*2, this.radius*2);
    }
    
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