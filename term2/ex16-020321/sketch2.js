let str = 'Jhn';
let tracker = 0;
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
    let fontPath = font.getPath(str, 0, 0, 150);
    // convert to g.Path object
    let gPath = new g.Path(fontPath.commands);
    // distribute points equally
    gPath = g.resampleByLength(gPath, 10);
    let pathArray = gPath.commands;

    for (let j = tracker; j < pathArray.length; j++) {
        stroke('#121212');
        noFill();
        beginShape();
        for (let i = 0; i < pathArray.length; i++) {
            if (pathArray[i].type == 'Z') {
                tracker = i+1;
                break;
            }
            tracker = i+1;
            vertex(pathArray[i].x, pathArray[i].y);
        }
        endShape(CLOSE);
    }
    
    // console.log(tracker);
    pop();
}