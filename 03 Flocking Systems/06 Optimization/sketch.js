var birds = [];
var debug =0 ;
var grid;


var desire;
var r;

var sepSlider, algnSlider, cohSlider, gridToggler;


function setup() {
    createCanvas(800,600);

    var bird = new Bird(random(width), random(height), 20);
    bird.v.set(random(-3,3), random(-3,3));
    birds.push(bird);

    grid = new Grid(30);

    desire = createVector();
    r = createVector();

    //I've added some easter eggs :)
    ui.create();
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

    ui.update();

    background(53);

    if (gridToggler.checked()) {
        fill(200,200,200, 80);
        stroke(0);
        grid.show();
    }
    noStroke();
    fill(200);
    var neighbors = [];
    for (var i = 0; i < birds.length; i++) {

        neighbors = grid.findNeighbors(birds[i].pos, birds);

        birds[i].separate(neighbors, sepSlider.value());
        birds[i].cohesion(neighbors, cohSlider.value());
        birds[i].align(neighbors, algnSlider.value());
        birds[i].update();
        grid.move(i, birds[i].prevPos, birds[i].pos);
        birds[i].show();
    }

}
