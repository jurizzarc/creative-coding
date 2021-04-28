class Circle {
    constructor(_r) {
        this.setCoordinates();
        this.radius = _r;
        this.isGrowing = true;
        this.color = colorPalette[int(random(1, colorPalette.length))];
    }

    // Sets the x and y coordinates of the circle
    setCoordinates() {
        while (this.coordinates == null || !this.isWithinShape(this.coordinates)) {
         // Position the circle within the shape
         this.coordinates = createVector(random(width), random(height)); 
     } 
    }

    // Return if the circle is in the shape
    isWithinShape(_coordinates) {
        // Get the current pixels of the circle
        let px = graphics.get(floor(_coordinates.x), floor(_coordinates.y));
        // Compare the pixels with the color of the text 
        return (
            px[0] == graphicsColor.levels[0] &&
            px[1] == graphicsColor.levels[1] &&
            px[2] == graphicsColor.levels[2] &&
            px[3] == graphicsColor.levels[3]
        );
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
        noStroke();
        fill(this.color);
        ellipse(this.coordinates.x, this.coordinates.y, this.radius*2);
    }
}