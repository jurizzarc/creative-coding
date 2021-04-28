let s = function(p) {
    let circles = [];
    let minR = 3;
    let maxR = 25;
    let gap = 1;
    let graphics, graphicsColor, colorPalette;
    class Circle {
        constructor(_r) {
            this.setCoordinates();
            this.radius = _r;
            this.isGrowing = true;
            this.color = colorPalette[p.int(p.random(1, colorPalette.length))];
        }
        setCoordinates() {
            while (this.coordinates == null || !this.isWithinShape(this.coordinates)) {
                this.coordinates = p.createVector(p.random(p.width), p.random(p.height)); 
            } 
        }
        isWithinShape(_coordinates) {
            let px = graphics.get(p.floor(_coordinates.x), p.floor(_coordinates.y));
            return (
                px[0] == graphicsColor.levels[0] &&
                px[1] == graphicsColor.levels[1] &&
                px[2] == graphicsColor.levels[2] &&
                px[3] == graphicsColor.levels[3]
            );
        }
        grow() {
            if (this.isGrowing) this.radius += 0.05;
        }
        hitsEdges() {
            return (
                this.coordinates.x - this.radius <= 0 ||
                this.coordinates.x + this.radius >= p.width ||
                this.coordinates.y - this.radius <= 0 ||
                this.coordinates.y + this.radius >= p.height
            );
        }
        render() {
            p.noStroke();
            p.fill(this.color);
            p.ellipse(this.coordinates.x, this.coordinates.y, this.radius*2);
        }
    }
    p.setup = function() {
        let sketchW = document.getElementById('sketch').offsetWidth;
        let sketchH = document.getElementById('sketch').offsetHeight;
        let renderer = p.createCanvas(sketchW, sketchH);
        renderer.parent('sketch');
        graphicsColor = p.color(0);
        colorPalette = [
            p.color(255, 238, 173),
            p.color(150, 206, 180),
            p.color(255, 111, 105),
            p.color(255, 204, 92),
            p.color(136, 216, 176)
        ];
        graphics = p.createGraphics(p.width, p.height);
        graphics.fill(graphicsColor);
        graphics.rectMode(p.CENTER);
        graphics.rect(p.width/2, p.height/2, 450, 275);
        p.image(graphics, 0, 0);
        p.background(colorPalette[0]);
    };
    p.draw = function() {
        let randR = p.floor(p.random(minR, maxR));
        let newC = new Circle(randR);
        p.addCircle(newC);
        for (let i = 0; i < circles.length; i++) {
            let circle = circles[i];
            if (circle.isGrowing) {
                // Stop circle from growing if it reaches the canvas sides
                if (circle.hitsEdges()) circle.isGrowing = false;
                for (let j = 0; j < circles.length; j++) {
                    let other = circles[j];
                    if (other != circle) {
                        let distance = circle.coordinates.dist(other.coordinates);
                        // Stop circle from growing if it collides with other circle
                        if (distance < circle.radius + other.radius + gap) circle.isGrowing = false;
                    }
                }
            }
            // Draw circle
            circles[i].render();
            // Increase its radius
            circles[i].grow();
        }
    };
    p.addCircle = function(_newC) {
        let newC = _newC;
        for (let i = 0; i < circles.length; i++) {
            let otherC = circles[i];
            let distance = newC.coordinates.dist(otherC.coordinates);
            if (distance < newC.radius + otherC.radius) return null;
        }
        circles.push(newC);
    };
};
new p5(s, 'sketch');