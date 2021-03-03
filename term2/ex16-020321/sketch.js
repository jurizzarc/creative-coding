let font;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();

    // Load the font
    opentype.load('assets/Poppins-Regular.otf', function(err, f) {
        if (err) {
            console.error(err);
        } else {
            font = f;
            loop();
        }
    });
}

function draw() {
    if (!font) return;
    background('#f5f5f5');
    push();
    translate(100, height/2);

    // create a path that represents the givent text
    // getPath(x, y [baseline pos], font size in px)
    let fontPath = font.getPath('Hello', 0, 0, 150);
    // convert to g.Path object
    let gPath = new g.Path(fontPath.commands);
    // distribute points along a shape by amount
    gPath = g.resampleByAmount(gPath, 300);

    fill('#121212');
    noStroke();
    for (let i = 0; i < gPath.commands.length; i++) {
        let point = gPath.commands[i];
        ellipse(point.x, point.y, 5);
    }

    pop();
}