class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 2;
        this.prevPos = this.pos.copy();
    }

    /**
     * Updates the particle's velocity based on its acceleration and
     * position based on its velocity
     */
    update() {
        // add velocity to acceleration
        this.vel.add(this.acc);
        // limit the velocity
        this.vel.limit(this.maxSpeed);
        // add position to velocity
        this.pos.add(this.vel);
        // reset acceleration to 0
        this.acc.mult(0);
    }

    /**
     * Finds the appropriate vector in the array for the particle to look up in the grid
     * @param {*} _vectors 
     */
    follow(vectors) {
        // based on the x and y pos of the particle, scale it to a grid of cols and rows
        let x = floor(this.pos.x/scl);
        let y = floor(this.pos.y/scl);
        // formula for taking a 2D value into a 1D array
        // look up the corresponsing vector in the 1D array
        let index = x+y*cols;
        let force = vectors[index];
        // apply that vector as a force
        this.applyForce(force);
    }

    /**
     * Accumulates any forces into the acceleration
     * @param {*} force 
     */
    applyForce(force) {
        // add force to acceleration
        this.acc.add(force);
    }

    /**
     * Updates previous position of the particle
     */
    updatePrev() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    /**
     * Checks if the particle bounces off the canvas edges
     */
    checkEdges() {
        if (this.pos.x > width) { 
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
    }

    /**
     * Draws the particle on the canvas
     */
    render() {
        stroke(0, 5);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        // point(this.pos.x, this.pos.y);
        this.updatePrev();
    }
}