let s = function(p) {
    class Point {
        constructor(_x, _y) {
            this.coordinates = p.createVector(_x, _y);
        }
        drawEllipse() {
            p.noStroke();
            p.fill(color);
            p.ellipse(this.coordinates.x, this.coordinates.y, 5, 5);
        }
        drawLine(_index) {
            p.stroke(color);
            p.line(this.coordinates.x, this.coordinates.y, points[_index].coordinates.x, points[_index].coordinates.y);
        }
        drawCurveVertex() {
            p.stroke(color);
            p.curveVertex(this.coordinates.x, this.coordinates.y);
        }
    };
    let numOfSegments = 180;
    let bgColor = '#000';
    let color = '#00C2BA';
    let points = [];
    let z = 0;
    let centerX, centerY, radius, angle;
    p.setup = function() {
        let sketchW = document.getElementById('sketch').offsetWidth;
        let sketchH = document.getElementById('sketch').offsetHeight;
        let renderer = p.createCanvas(sketchW, sketchH);
        renderer.parent('sketch');
        centerX = p.width/2;
        centerY = p.height/2;
        radius = 175;
        angle = p.radians(360/numOfSegments);
        for (let i = 0; i < numOfSegments; i++) {
            let xPos = radius * p.cos(angle*i);
            let yPos = radius * p.sin(angle*i);
            points.push(new Point(xPos, yPos));
        }
    };
    p.draw = function() {
        p.background(bgColor);
        p.push();
        p.translate(centerX, centerY);
        p.animatePoints();
        // points.forEach(point => {
        //     point.drawEllipse();
        // });
        // p.drawLines(points);
        p.drawCurveVertices(points);
        p.pop();
    };
    p.drawLines = function(_array) {
        for (let i = 0; i < _array.length - 1; i++) {
            _array[i].drawLine(i+1);
        }
        p.line(_array[_array.length-1].coordinates.x, _array[_array.length-1].coordinates.y,
            _array[0].coordinates.x, _array[0].coordinates.y);
    };
    p.drawCurveVertices = function(_array) {
        p.noFill();
        p.beginShape();
        // first controlled points
        p.curveVertex(_array[_array.length-1].coordinates.x, _array[_array.length-1].coordinates.y);
        p.curveVertex(_array[_array.length-1].coordinates.x, _array[_array.length-1].coordinates.y);
        _array.forEach(item => {
            item.drawCurveVertex();
        });
        // last controlled points
        p.curveVertex(_array[0].coordinates.x, _array[0].coordinates.y);
        p.curveVertex(_array[0].coordinates.x, _array[0].coordinates.y);
        p.endShape();
    };
    p.animatePoints = function() {
        points = [];
        z += 0.01;
        for (let i = 0; i < numOfSegments; i++) {
            let x = p.map(p.cos(i), 0, 1, 2, 5);
            let y = p.map(p.sin(i), 0, 1, 2, 5);
            let n = p.noise(x, y, z);
            let xPos = radius * p.cos(angle*i) * n;
            let yPos = radius * p.sin(angle*i) * n;
            points.push(new Point(xPos, yPos));
        }
    };
};
new p5(s, 'sketch');