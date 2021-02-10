let stepSize = 1;
let angle = 45;
let xPos, yPos;

let angles;
let angleCount = 3;
let startAngle;
let stepAngle;

let points = [];
let oddArr = [];
let evenArr = [];

function setup() {
    createCanvas(500, 500);
    background(0);
    //noLoop();

    xPos = width/2;
    yPos = height/2;
    angles = [];
    stepAngle = 90/angleCount;
    startAngle = stepAngle/2;
}

function draw() {
    for (let i = startAngle; i < 90; i += stepAngle) {
        angles.push(i);
        angles.push(i*-1);
    }

    let speed = map(mouseX, 0, width, 2, 10);

    for (let x = 0; x < 10; x++) {
        stroke(255);
        strokeWeight(5);
        point(xPos, yPos);
        
        xPos += cos(radians(angle) * stepSize);
        yPos += sin(radians(angle) * stepSize);
        //console.log(`${xPos}, ${yPos}`);
        storePoints(xPos, yPos, points);
        //console.log(points);

        if (xPos < 0 || xPos > width || yPos < 0 || yPos > height) {
            angle = getRandomAngle(xPos, yPos, angles);
            //console.log(angle);
        }
    }

    for (let j = 0; j < points.length; j++) {
        // index is even
        if (j % 2 === 0) {
            let x1 = points[j].x;
            let y1 = points[j].y;
            evenArr.push({
                x: x1,
                y: y1
            });
        } else {
            let x2 = points[j].x;
            let y2 = points[j].y;
            oddArr.push({
                x: x2,
                y: y2
            });
        }

        //let distance = int(dist(evenArr[j].x, evenArr[j].y, oddArr[j].x, oddArr[j].y));
        //console.log(distance);
    }
    // console.log(evenArr);
    console.log(oddArr);
}

function getRandomAngle(_xPos, _yPos, _angles) {
    let randomNum = floor(random(_angles.length));
    let randomAngle = _angles[randomNum];

    if (_xPos > width) {
        return randomAngle + 90;
    } else if (_xPos < 0) {
        return randomAngle + 270;
    }
    
    if (_yPos > height) {
        return randomAngle + 180;
    } else if (_yPos < 0) {
        return randomAngle;
    }
}

function storePoints(_xPos, _yPos, _points) {
    _points.push({
        x: _xPos,
        y: _yPos
    });
}