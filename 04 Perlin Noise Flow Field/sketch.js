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

    force = createVector(1, 0);

    colorMode(HSB);
}

function draw() {


    for (var i = 0; i < particles.length; i++) {
        //Get the flow field vector orientation
        var a = ff.angleAt(particles[i].pos);
        //Reset the force and cet it to point to the extracted orientation
        force.set(0.5, 0);
        force.rotate(a);

        particles[i].applyForce(force);
        particles[i].update();
        particles[i].show();
    }

    ff.update();
    //Uncomment to see the flow field
    //ff.show();

}
