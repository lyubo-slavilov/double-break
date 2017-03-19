var p1, p2, s;

var particles = [];
var springs = [];

var cols = 30;
var rows = 15;
var sp = 20; //particle spacing
var gravity;

function setup() {
    createCanvas(800, 800);
    background(51);

    //Put some week gravity
    gravity = createVector(0, 0.05);


    //Generate the particles and the springs
    var pi;
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            pi = particles.length - 1;
            //Create new particle on the grid
            particles.push(new Particle(100 + i * sp, 100 + j * sp));

            //Attach the new particle with the previous one
            //Notice 'pi' holds the index of the previous particle
            if (i > 0) {
                springs.push(new Spring(particles[pi], particles[pi + 1], 0.5));
            }
            //Attach the particle with the particle above
            if (j > 0) {
                pi = particles.length - 1;
                springs.push(new Spring(particles[pi - cols], particles[pi], 0.5));
            }
        }
    }

    particles[0].locked = true;
    particles[cols - 1].locked = true;
}

function draw() {
    background(255);

    var mouseTarget = createVector(mouseX, mouseY);

    //Compute the simulation tree times per frame
    for (var t = 0; t < 3; t++) {
        //First compute the particles' state
        for (var i = 0; i < particles.length; i++) {
            particles[i].flee(mouseTarget);
            particles[i].applyForce(gravity);
            particles[i].update();
        }
        //Second, apply all the spring forces
        for (var i = 0; i < springs.length; i++) {
            springs[i].apply();
        }
    }

    //Finally draw
    for (var i = 0; i < springs.length; i++) {
        springs[i].show();
    }

    //Uncomment if you want to see the particles
    // for (var i = 0; i < particles.length; i++) {
    //     particles[i].show();
    // }

}
