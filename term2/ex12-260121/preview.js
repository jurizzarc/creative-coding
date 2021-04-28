let s = function (p) {
    let stepSize = 1;
    let angle = 45;
    let angleCount = 5;
    let sw = 1;
    let x1, y1, x2, y2, colorPalette;
    p.setup = function () {
        let sketchW = document.getElementById('sketch').offsetWidth;
        let sketchH = document.getElementById('sketch').offsetHeight;
        let renderer = p.createCanvas(sketchW, sketchH);
        renderer.parent('sketch');
        p.smooth();
        p.pixelDensity(5);
        x1 = 0;
        y1 = 0;
        colorPalette = [
            p.color(225, 221, 191),
            p.color(4, 37, 58),
            p.color(76, 131, 122)
        ];
        p.background(colorPalette[0]);
    };
    p.draw = function () {
        let speed = p.map(p.mouseX, 0, p.width, 2, 8);
        for (let i = 0; i < speed; i++) {
            x1 += p.cos(p.radians(angle)) * stepSize;
            y1 += p.sin(p.radians(angle)) * stepSize;
            p.stroke(colorPalette[1]);
            p.strokeWeight(sw);
            p.point(x1, y1);
            x2 = p.width - x1;
            y2 = p.height - y1;
            p.stroke(colorPalette[2]);
            p.point(x2, y2);
            if (x1 < 0 || x1 > p.width/2 || y1 < 0 || y1 > p.height) angle = p.getRandomAngle(x1, y1);
        }
    };
    p.getRandomAngle = function (_x, _y) {
        let randomAngle = (p.floor(p.random(-angleCount, angleCount)) + 0.5) * 90 / angleCount;
        let swOptions = [1, 2, 3, 4, 5];
        sw = swOptions[p.floor(p.random()*swOptions.length)];
        if (_x > p.width/2) return randomAngle + 180;
        if (_x < 0) return randomAngle;
        if (_y > p.height) return randomAngle - 90;
        if (_y < 0) return randomAngle + 90;
    }
};
new p5(s, 'sketch');