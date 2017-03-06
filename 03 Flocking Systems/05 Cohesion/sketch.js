var birds = [];
function setup() {
    createCanvas(800,600);

    var bird = new Bird(random(width), random(height), 20);
    bird.v.set(random(-3,3), random(-3,3));
    birds.push(bird);
}

function keyPressed() {
    if (key == ' ') {
        for (var i = 0; i < 100; i++) {
            var bird = new Bird(random(width), random(height), 20);
            bird.v.set(random(-3,3), random(-3,3));
            birds.push(bird);
        }
    }
}

function draw() {
    background(53);
    for (var i = 0; i < birds.length; i++) {
        birds[i].separate(birds, 2);
        birds[i].cohesion(birds, 1);
        birds[i].align(birds, 1);
        birds[i].update();
        birds[i].show();
    }
}
