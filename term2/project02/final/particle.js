class Particle {
    constructor(_r) {
        this.setCoordinates();
        this.life = random(0.1, maxLife);
        this.lifeRate = random(0.01, 0.05);
        this.color = currentPalette[floor(random(1, currentPalette.length))];
        this.angle;
        if (drawMode === 3 || drawMode === 4) this.radius = _r;
    }

    setCoordinates(_x, _y) {
        while (this.coordinates == null || 
               props.withinText && !this.isInText(this.coordinates) || 
               !props.withinText && this.isInText(this.coordinates)) {
            this.coordinates = createVector(random(width), random(height));
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
        if (drawMode === 1 || drawMode === 3) noiseStrength = TWO_PI;
        if (drawMode === 2) noiseStrength = PI;
        if (drawMode === 4) noiseStrength = 300;
        this.angle = noise(this.coordinates.x*noiseScale, this.coordinates.y*noiseScale) * noiseStrength;
        this.coordinates.x += cos(this.angle) * stepSize;
        this.coordinates.y += sin(this.angle) * stepSize;
        this.life -= this.lifeRate;
    }

    /**
     * Draws particle on the canvas
     */
    render() {
        let aOptions, a;
        let swOptions = [0.25, 0.50, 0.75, 1, 1.25, 1.50, 1.75, 2];
        let sw = swOptions[floor(random()*swOptions.length)];
        let r = this.color.levels[0];
        let g = this.color.levels[1];
        let b = this.color.levels[2];
        if (drawMode === 1 || drawMode === 2) {
            aOptions = [20, 30, 40, 50, 60, 70, 80];
            a = aOptions[floor(random()*aOptions.length)];
            noFill();
            strokeWeight(sw);
            stroke(r, g, b, a);
            point(this.coordinates.x, this.coordinates.y);
        } else if (drawMode === 3) {
            fill(this.color);
            noStroke();
            ellipse(this.coordinates.x, this.coordinates.y, this.radius*this.life);
        } else if (drawMode === 4) {
            aOptions = [100, 120, 140, 160, 180, 200];
            a = aOptions[floor(random()*aOptions.length)];
            noFill();
            stroke(r, g, b, a);
            ellipse(this.coordinates.x, this.coordinates.y, this.radius*this.life);
        }
    }
}