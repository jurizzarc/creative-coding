class Particle {
    constructor(_r) {
        this.getPosition();
        this.life = random(0.2, 0.6);
        this.lifeRate = random(0.01, 0.05);
        if (drawMode === 1) {
            // this.radius = _r;
            this.color = currentPalette[int(random(1, currentPalette.length))];
        } 
    }

    getPosition(_x, _y) {
        while (this.coordinates == null || 
               props.withinText && !this.isInText(this.coordinates) || 
               !props.withinText && this.isInText(this.coordinates)) {
            if (drawMode === 1) {
                this.coordinates = createVector(random(width), random(height));
            } else {
                this.coordinates = createVector(random(rad, width-rad), random(rad, height-rad));
            }
        } 
    }

    isInText(_coordinates) {
        let px = graphics.get(floor(_coordinates.x), floor(_coordinates.y));
        return (
            px[0] == graphicsCol.levels[0] &&
            px[1] == graphicsCol.levels[1] &&
            px[2] == graphicsCol.levels[2] &&
            px[3] == graphicsCol.levels[3]
        );
    }

    update() {
        let xOff, yOff, zOff;
        if (drawMode === 1) {
            xOff = 0.06;
            yOff = 0.06;
        }
        let angle = noise(this.coordinates.x*xOff, this.coordinates.y*yOff) * TWO_PI;
        let vel = p5.Vector.fromAngle(angle);
        this.coordinates.add(vel);
        this.life -= this.lifeRate;
    }

    /**
     * Draws particle on the canvas
     */
    render() {
        // noStroke();
        // fill(this.color);
        // ellipse(this.coordinates.x, this.coordinates.y, this.radius*this.life);
        let options = [0, 0, 1, 1];
        let randomNum = floor(random(0, options.length));
        let r = this.color.levels[0];
        let g = this.color.levels[1];
        let b = this.color.levels[2];
        if (drawMode === 1) {
            noFill();
            strokeWeight(randomNum === 0 ? random(0.50, 2) : 0.75);
            stroke(r, g, b, randomNum === 0 ? round(random(50, 75)) : 75);
            point(this.coordinates.x, this.coordinates.y);
        }
    }
}