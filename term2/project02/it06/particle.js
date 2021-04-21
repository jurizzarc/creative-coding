class Particle {
    constructor(_r) {
        this.getPosition();
        this.radius = _r;
        this.life = random(0.2, 0.9);
        this.lifeRate = random(0.01, 0.05);
    }

    getPosition(_x, _y) {
        while (this.coordinates == null || this.isInText(this.coordinates)) this.coordinates = createVector(random(r, width-r), random(r, height-r));
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
        let angle = noise(this.coordinates.x*0.03, this.coordinates.y*0.03, frameCount*0.03) * TWO_PI;
        let vel = p5.Vector.fromAngle(angle);
        this.coordinates.add(vel);
        this.life -= this.lifeRate;
    }

    /**
     * Draws particle on the canvas
     */
    render() {
        noStroke();
        fill(255, 50);
        ellipse(this.coordinates.x, this.coordinates.y, this.radius*this.life);
    }
}