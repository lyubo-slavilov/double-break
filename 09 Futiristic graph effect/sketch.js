var particles = [];
var edges = [];
var edgesDrawn = 0;
var maxConnectionDistance = 400;

function setup() {
	createCanvas(1800, 1000);
	background(0);

    //First create all the seeds and the particles they will produce
    //Notice we store all the seeds and particles in the same array
    var seed;
    for (var i = 0; i < 300; i++) {
        seed = new Seed(random(width), random(height));
        particles.push(seed);

        //For each seed add 2 or 3 particles
        var particleCount = random(2,3);
        for (j = 0; j < particleCount; j++) {
            particles.push(new Particle(seed));
        }
    }


    //Second create a symetric map of connections
    //Bassicaly conmap[i][j] and conmap[j][i] are true if there is a connection
    //between particle i and particle j
    var connmap = [];
    for (var i = 0; i < particles.length; i++) {
        connmap.push([]);
        for (var j = 0; j < particles.length; j++) {
            connmap[i].push(false);
        }
    }

    //Create the edges between some of the perticles
    for (var i = 0; i < particles.length; i++) {
        for (var j = 0; j < particles.length; j++) {
            if (particles[i] == particles[j]) {
                continue; //skip this pair because we can not connect particle to itself.
            }

            if (connmap[i][j] || connmap[j][i]) {
                continue; //skip this pair as it already connected
            }

            if (distSq(particles[i], particles[j]) >= maxConnectionDistance*maxConnectionDistance) {
                continue; //skip this pair as particles are to far eachother
            }

            edges.push(new Edge(particles[i], particles[j]));
            connmap[i][j] = connmap[j][i] = true; //notice we keep this symetric!
        }
    }

}

function draw() {
    background(51);

    //Update all particles
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
    }
    //Draw all edges
    for (var i = 0; i < edges.length; i++) {
        edges[i].show();
    }
    //Draw all particles
    for (var i = 0; i < particles.length; i++) {
        particles[i].show();
    }

}


//Little helper function which calculates the distance squared between 2 particles
function distSq(p1, p2) {

    var a1 = p1.anchor;
    var a2 = p2.anchor;

    var dx = a1.x - a2.x;
    var dy = a1.y - a2.y;
    return dx*dx + dy*dy;

}
