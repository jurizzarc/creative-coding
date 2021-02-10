let radius = 100;
let numOfSegments = 16;
let bgColor = '#000';
let fillColor = '#652DC7';
let strokeColor = '#00C2BA';
let points = [];
let angle, centerX, centerY, customShape1;

function setup() {
    createCanvas(500, 500);
    background(bgColor);
    centerX = width/2;
    centerY = height/2;
    angle = radians(360/numOfSegments);
    
    for (let i = 0; i < numOfSegments; i++) {
        points.push(new CustomShape (0, 0, radius, fillColor, strokeColor));
    }
}

function draw() {
    background(bgColor);
    push();
    translate(centerX, centerY);
    points.forEach(point => {
        point.drawEllipses();
    });
    pop();
}