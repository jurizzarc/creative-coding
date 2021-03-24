let inc = 0.1;
let scl = 10; // ratio of cell to width
let zOff = 0; // represents time or every frame of animation
let particles = [];
let flowfield; // store all calculated vectors in this array
let cols, rows, fr;

function setup() {
    createCanvas(800, 600);
    background(255);
    // grid variables
    cols = floor(width/scl);
    rows = floor(height/scl);
    fr = createP('');

    // pre set the size of the array
    flowfield = new Array(cols*rows);

    for (let i = 0; i < 900; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    let yOff = 0;
    for (let y = 0; y < rows; y++) {
        let xOff = 0;
        for (let x = 0; x < cols; x++) {
            let index = x+y*cols;
            let angle = noise(xOff, yOff, zOff) * TWO_PI * 4;
            // create vector from angle
            let v = p5.Vector.fromAngle(angle);
            v.setMag(1); // force
            // store calculated vectors in flowfield array
            flowfield[index] = v;
            xOff += inc;
            // stroke(0, 50);
            // strokeWeight(1);
            // push();
            // translate(x*scl, y*scl);
            // rotate(v.heading());
            // line(0, 0, scl, 0);
            // pop();
        }
        yOff += inc;
        zOff += 0.0003;
    }

    particles.forEach(particle => {
        particle.follow(flowfield); 
        particle.update();
        particle.checkEdges();
        particle.render();
    });

    fr.html(floor(frameRate()));
}