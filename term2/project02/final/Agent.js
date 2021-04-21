class Agent {
    constructor(_r) {
        this.setCoordinates();
        if (drawMode == 'Line') this.oldCoordinates;
        this.health = random(0.1, maxHealth);
        this.lifeSpan = random(0.01, 0.04);
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
            // Position the agent anywhere within the canvas
            this.coordinates = createVector(random(width), random(height)); 
            // Create a copy of the coordinates vector
            this.oldCoordinates = this.coordinates.copy(); 
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
        // Map the noise value to an angle between 0 and TWO_PI and scale by noise strength
        this.angle = map(noiseVal, 0, 1, 0, TWO_PI) * noiseStrength;
        // Move the agent 
        this.coordinates.x += cos(this.angle) * stepSize;
        this.coordinates.y += sin(this.angle) * stepSize;
        // Decrease the agent's health 
        this.health -= this.lifeSpan;
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
        // Draw the agent as a point, ellipse or line
        if (drawMode == 'Point') {
            // Stroke weight options
            swOptions = [0.50, 0.75, 1, 1.25];
            // Randonly select a value from the swOptions array
            sw = swOptions[floor(random()*swOptions.length)];
            // Alpha options
            aOptions = [50, 55, 60, 65, 70, 75];
            // Randomly select a value from the aOptions array
            a = aOptions[floor(random()*aOptions.length)];
            noFill();
            strokeWeight(sw);
            stroke(r, g, b, a);
            point(this.coordinates.x, this.coordinates.y);
        } else if (drawMode == 'Ellipse') {
            aOptions = [60, 70, 80, 90, 100, 110, 120];
            a = aOptions[floor(random()*aOptions.length)];
            fill(r, g, b, a);
            noStroke();
            ellipse(this.coordinates.x, this.coordinates.y, this.radius*this.health);
        } else if (drawMode == 'Line') {
            aOptions = [80, 90, 100, 110, 120, 130, 140, 150];
            a = aOptions[floor(random()*aOptions.length)];
            let d = random(50)/this.coordinates.dist(this.oldCoordinates);
            // Get smallest value 
            sw = min(1, d);
            strokeWeight(sw);
            strokeCap(SQUARE);
            stroke(r, g, b, a);
            line(this.coordinates.x, this.coordinates.y, this.oldCoordinates.x, this.oldCoordinates.y);
            this.updateOld();
        }
    }
}