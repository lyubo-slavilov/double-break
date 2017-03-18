var t = 0;
var ff;
var force;
var particles = [];
function setup() {
	createCanvas(800, 600);
	background(0);

    ff = new Flowfield(20);

    for (var i = 0; i < 600; i++) {
        particles.push(new Particle());
    }

    force = createVector(1,0);

    colorMode(HSB);
}

function draw() {

    //background(0);

    for (var i = 0; i < particles.length; i++) {
        var a = ff.angleAt(particles[i].pos);
        force.set(1,0);
        force.rotate(a);
        force.mult(0.5);
        particles[i].applyForce(force);
        particles[i].update();
        particles[i].show();
    }

    ff.update();
    //ff.show();

}
