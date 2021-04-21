class Agent {
    constructor(_r) {
        this.setCoordinates();
        if (drawMode == 'Line') this.oldCoordinates;
        this.life = random(0.1, maxLife);
        this.lifeRate = random(0.01, 0.04);
        this.color = colorPalette[int(random(0, colorPalette.length))]; 
        this.angle;
        if (drawMode == 'Ellipse') this.radius = _r;
    }

    /**
     * Sets the x and y coordinates of the agent
     */
    setCoordinates() {
        while (this.coordinates == null || 
               props.withinText && !this.isWithinText(this.coordinates) || 
               !props.withinText && this.isWithinText(this.coordinates)) {
            this.coordinates = createVector(random(width), random(height)); // Position the agent anywhere within the canvas
            this.oldCoordinates = this.coordinates.copy(); // Create a copy of the coordinates vector
        } 
    }

    /**
     * Returns if the agent is in the text 
     * @param {object} _coordinates 
     * @return {boolean}
     */
    isWithinText(_coordinates) {
        // Get the current pixels of the agent
        let px = graphics.get(floor(_coordinates.x), floor(_coordinates.y));
        // Compare the pixels with the color of the text 
        return (
            px[0] == graphicsColor.levels[0] &&
            px[1] == graphicsColor.levels[1] &&
            px[2] == graphicsColor.levels[2] &&
            px[3] == graphicsColor.levels[3]
        );
    }

    /**
     * Moves the agent around the canvas 
     */
    update() {
        // Scale the x and y coordinates of the agent
        let scaleX = this.coordinates.x*noiseScale;
        let scaleY = this.coordinates.y*noiseScale;
        // Get the noise value 
        let noiseVal = noise(scaleX, scaleY);
        // Map the noise value to an angle between 0 and TWO_PI
        this.angle = map(noiseVal, 0, 1, 0, TWO_PI);
        // Move the agent 
        this.coordinates.x += cos(this.angle) * stepSize;
        this.coordinates.y += sin(this.angle) * stepSize;
        // Decrease the agent's life by the life rate
        this.life -= this.lifeRate;
    }

    /**
     * Updates the old coordinates of the agent
     */
    updateOld() {
        this.oldCoordinates.x = this.coordinates.x;
        this.oldCoordinates.y = this.coordinates.y;
    }

    /**
     * Updates the current/old coordinates of the agent if it reaches an edge of the canvas
     */
    hitsEdges() {
        if (this.coordinates.x > width) { 
            this.coordinates.x = 0;
            this.updateOld();
        }
        if (this.coordinates.x < 0) {
            this.coordinates.x = width;
            this.updateOld();
        }
        if (this.coordinates.y > height) {
            this.coordinates.y = 0;
            this.updateOld();
        }
        if (this.coordinates.y < 0) {
            this.coordinates.y = height;
            this.updateOld();
        }
    }

    /**
     * Draws agent on the canvas
     */
    render() {
        let swOptions, sw;
        let aOptions, a;
        // Separate the r, g, b values of the colour
        let r = this.color.levels[0];
        let g = this.color.levels[1];
        let b = this.color.levels[2];
        // Draw the agent as a point
        if (drawMode == 'Point') {
            // Stroke weight options
            swOptions = [0.25, 0.50, 0.75, 1, 1.25, 1.50, 1.75, 2];
            sw = swOptions[floor(random()*swOptions.length)];
            aOptions = [5, 10, 15, 20, 25, 30];
            a = aOptions[floor(random()*aOptions.length)];
            noFill();
            strokeWeight(sw);
            stroke(r, g, b, a);
            point(this.coordinates.x, this.coordinates.y);
        } 
        // Draw the agent as an ellipse
        if (drawMode == 'Ellipse') {
            fill(r, g, b);
            noStroke();
            ellipse(this.coordinates.x, this.coordinates.y, this.radius*this.life);
        } 
        // Draw the agent as a line
        if (drawMode == 'Line') {
            swOptions = [0.25, 0.50, 0.75, 1, 1.25, 1.50, 1.75, 2, 2.25, 2.50, 2.75, 3];
            sw = swOptions[floor(random()*swOptions.length)];
            aOptions = [80, 90, 100, 110, 120, 130, 140, 150];
            a = aOptions[floor(random()*aOptions.length)];
            strokeWeight(sw);
            strokeCap(SQUARE);
            stroke(r, g, b, a);
            line(this.coordinates.x, this.coordinates.y, this.oldCoordinates.x, this.oldCoordinates.y);
            this.updateOld();
        }
    }
}