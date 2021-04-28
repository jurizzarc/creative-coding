let s = function (p) {
    class Agent {
        constructor() {
            this.setCoordinates();
            this.oldCoordinates;
            this.health = p.random(0.1, maxHealth);
            this.lifeSpan = p.random(0.01, 0.04);
            this.color = colorPalette[p.int(p.random(0, colorPalette.length))];
            this.angle;
        }
        /**
         * sets the x and y coordinates of the agent
         */
        setCoordinates() {
            while (this.coordinates == null || !withinText && this.isWithinText(this.coordinates)) {
                // position the agent anywhere within the canvas
                this.coordinates = p.createVector(p.random(p.width), p.random(p.height));
                // create a copy of the coordinates vector
                this.oldCoordinates = this.coordinates.copy();
            }
        }

        /**
         * Returns if the agent is in the text
         * @param object _coordinates 
         */
        isWithinText(_coordinates) {
            // get the current pixels of the agent
            let px = graphics.get(p.floor(_coordinates.x), p.floor(_coordinates.y));
            // compare the pixels with the color of the text
            return (
                px[0] == graphicsColor.levels[0] &&
                px[1] == graphicsColor.levels[1] &&
                px[2] == graphicsColor.levels[2] &&
                px[3] == graphicsColor.levels[3]
            );
        }

        /**
         * moves the agent around the canvas
         */
        update() {
            // scale the x and y coordinates of the agent
            let scaleX = this.coordinates.x * noiseScale;
            let scaleY = this.coordinates.y * noiseScale;
            // get the noise value
            let noiseVal = p.noise(scaleX, scaleY);
            // map the noise value to an angle between 0 and TWO_PI and scale by noise strength
            this.angle = p.map(noiseVal, 0, 1, 0, p.TWO_PI) * noiseStrength;
            // move the agent
            this.coordinates.x += p.cos(this.angle) * stepSize;
            this.coordinates.y += p.sin(this.angle) * stepSize;
            // decrease the agent's health
            this.health -= this.lifeSpan;
        }

        /**
         * updates the old coordinates of the agent
         */
        updateOld() {
            this.oldCoordinates.x = this.coordinates.x;
            this.oldCoordinates.y = this.coordinates.y;
        }

        /**
         * updates the current and old coordinates of the agent if it reaches an edge of the canvas
         */
        hitsEdges() {
            if (this.coordinates.x > p.width) { 
                this.coordinates.x = 0;
                this.updateOld();
            }
            if (this.coordinates.x < 0) {
                this.coordinates.x = p.width;
                this.updateOld();
            }
            if (this.coordinates.y > p.height) {
                this.coordinates.y = 0;
                this.updateOld();
            }
            if (this.coordinates.y < 0) {
                this.coordinates.y = p.height;
                this.updateOld();
            }
        }
        
        /**
         * draws agent on the canvas
         */
        render() {
            let aOptions = [80, 90, 100, 110, 120, 130, 140, 150];
            let a = aOptions[p.floor(p.random()*aOptions.length)];
            let d = p.random(50)/this.coordinates.dist(this.oldCoordinates);
            // Get smallest value 
            let sw = p.min(1, d);
             // Separate the r, g, b values of the colour
            let r = this.color.levels[0];
            let g = this.color.levels[1];
            let b = this.color.levels[2];
            p.strokeWeight(sw);
            p.strokeCap(p.SQUARE);
            p.stroke(r, g, b, a);
            p.line(this.coordinates.x, this.coordinates.y, this.oldCoordinates.x, this.oldCoordinates.y);
            this.updateOld();
        }
    };

    const numOfAgents = 1000;
    let agents = [];
    let colorPalette = [];
    let str = 'flow';
    let fontSize = 200;
    let withinText = false;
    let noiseScale = 0.005;
    let noiseStrength = 2;
    let maxHealth = 0.2;
    let stepSize = 1;
    let graphics, graphicsFont, graphicsColor, bgColor;

    p.preload = function() {
        // get font from assets folder
        graphicsFont = p.loadFont('assets/Avenir.otf');
    };

    p.setup = function() {
        let sketchW = document.getElementById('sketch').offsetWidth;
        let sketchH = document.getElementById('sketch').offsetHeight;
        let renderer = p.createCanvas(sketchW, sketchH);
        renderer.parent('sketch');

        bgColor = p.color(255);
        graphicsColor = p.color(0);
        colorPalette = [
            p.color(50, 168, 82),
            p.color(69, 192, 181),
            p.color(80, 192, 69)
        ];

        p.smooth();
        p.pixelDensity(2);
        // render text into an off-screen graphics
        graphics = p.createGraphics(p.width, p.height);
        graphics.textFont(graphicsFont);
        graphics.textSize(fontSize);
        graphics.textAlign(p.CENTER, p.CENTER);
        graphics.fill(graphicsColor);
        graphics.text(str.toUpperCase(), p.width/2, p.height/2);
        p.image(graphics, 0, 0);
        graphics.loadPixels();
        p.background(bgColor);
    };

    p.draw = function() {
        p.removeAgents();
        // create agents until the maximum amount is reached
        while (agents.length < numOfAgents) p.addAgent();

        agents.forEach(agent => {
            // move agent
            agent.update();
            // check if agent hits the sides of the canvas
            agent.hitsEdges();
            // draw agent on the canvas
            agent.render();
        })
    };

    /**
     * creates an agent from the Agent class
     * add this agents to the agents array
     */
    p.addAgent = function() {
        let agent = new Agent();
        agents.push(agent);
    }

    /**
     * stops the agent's movement when it has no health left
     */
    p.removeAgents = function() {
        for (let i = agents.length-1; i >= 0; i--) {
            // remove agent from the agents array if it has no health left
            if (agents[i].health <= 0) agents.splice(i, 1);
        }
    }
};
new p5(s, 'sketch');