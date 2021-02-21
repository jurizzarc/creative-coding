let s = function(p) {
    let x, y, colours;
    let diam = 12;
    let step = diam/2;
    let t = 0;
    let optionsX = [-1, 0, 1];
    let optionsY = [-1, 0, 1];
    p.setup = function() {
        let sketchW = document.getElementById('sketch').offsetWidth;
        let sketchH = document.getElementById('sketch').offsetHeight;
        let renderer = p.createCanvas(sketchW, sketchH);
        renderer.parent('sketch');
        p.background(255);
        x = p.width/2;
        y = p.height/2;
        colours = [
            p.color(107, 61, 79),
            p.color(148, 76, 102),
            p.color(180, 111, 131),
            p.color(244, 118, 154),
            p.color(253, 138, 178),
            p.color(247, 166, 188)
        ];
        p.frameRate(24);
    };
    p.draw = function() {
        let randX = p.floor(p.random(0, optionsX.length));
        let randY = p.floor(p.random(0, optionsY.length));
        let randC = p.floor(p.random(0, colours.length));
        let moveX = optionsX[randX] * step * p.noise(t);
        let moveY = optionsY[randY] * step * p.noise(t);
        let colour = colours[randC];
        x += moveX;
        y += moveY;
        t += 0.03;
        if (x < 0) x = p.width;
        if (x > p.width) x = 0;
        if (y < 0) y = p.height;
        if (y > p.height) y = 0;
        p.noStroke();
        p.fill(colour);
        p.ellipse(x, y, diam);
    }
};
new p5(s, 'sketch');