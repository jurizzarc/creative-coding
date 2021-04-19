let str = 'Jurizza';
let pathArray = [];
let font, fontPath, gPath, pointsArray;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
    // Load the font
    opentype.load('assets/Poppins-Regular.otf', function (err, f) {
        if (err) {
            console.error(err)
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
    translate(100, height / 2);
    // Create a path that represents the text
    fontPath = font.getPath(str, 0, 0, 150);
    // Convert to g.Path object
    gPath = new g.Path(fontPath.commands);
    // Distribute points equally
    gPath = g.resampleByLength(gPath, 5);
    // Store commands in array
    pathArray = gPath.commands;

    // beginShape();
    // stroke('#121212');
    // strokeWeight(2);
    // noFill();
    // for (let i = 0; i < pathArray.length; i++) {
    //     let points = pathArray[i];
    //     vertex(points.x, points.y);
    // }
    // endShape(CLOSE);

    pointsArray = splitArray(pathArray);
    // Draw vertices
    for (let i = 0; i < pointsArray.length; i++) {
        let points = pointsArray[i];
        stroke('#121212');
        strokeWeight(2);
        noFill();
        beginShape();
        for (let p of points) {
            vertex(p.x, p.y);
        }
        endShape(CLOSE);
    }

    // Draw curve vertices
    // for (let i = 0; i < pointsArray.length; i++) {
    //     let points = pointsArray[i];
    //     stroke('#121212');
    //     strokeWeight(2);
    //     noFill();
    //     beginShape();
    //     // First controlled points
    //     curveVertex(points[0].x, points[0].y);
    //     curveVertex(points[0].x, points[0].y);
    //     for (let p of points) {
    //         curveVertex(p.x, p.y);
    //     }
    //     // Last controlled points
    //     curveVertex(points[points.length-2].x, points[points.length-2].y);
    //     curveVertex(points[points.length-2].x, points[points.length-2].y);
    //     endShape(CLOSE);
    // }

    // for (let i = 0; i < pathArray.length; i++) {
    //     fill('#eb2323');
    //     noStroke();
    //     let points = pathArray[i];
    //     ellipse(points.x, points.y, 3);
    // }

    pop();

    if (frameCount == 1) noLoop();
}

function splitArray(_arr) {
    let reduced = _arr.reduce((acc, obj) => {
        acc[acc.length-1].push(obj);
        if (obj.type === 'Z') acc.push([]);
        return acc;
    }, [[]]);

    return reduced.slice(0, reduced.length-1);
}