class Particle {
    constructor() {
        this.getPosition();
        this.life = random(0.2, 1.2);
        this.lifeRate = random(0.01, 0.05);
    }

    /**
     * Get random position inside the text
     */
    getPosition() {
        while (this.pos == null || !this.isInText(this.pos)) this.pos = createVector(random(width), random(height));
    }

    /**
     * Returns if particle is in the text
     * @param {object} _pos 
     * @returns {boolean} 
     */
    isInText(_pos) {
        let px = pg.get(floor(_pos.x), floor(_pos.y));
        return (
            px[0] == pgCol.levels[0] &&
            px[1] == pgCol.levels[1] &&
            px[2] == pgCol.levels[2] &&
            px[3] == pgCol.levels[3]
        );
    }

    /**
     * Updates the position of the particle based on angle and velocity
     * Decreases life of the particle by the lifeRate
     */
    update() {
        // The angle is based on a flowfield
        let angle = noise(this.pos.x*0.01, this.pos.y*0.01, zOff) * 360;
        // Create a 2D vector from angle and fc
        let vel = p5.Vector.fromAngle(angle);
        this.pos.add(vel);
        this.life -= this.lifeRate;
    }

    /**
     * Draws an ellipse on the canvas
     */
    render() {
        noFill();
        stroke(0, floor(random(100, 200)));
        let r = 8 * this.life;
        ellipse(this.pos.x, this.pos.y, r);
    }
}