var pipes;
var bird;
var gravity;

var score = 0;
var best = 0;
var running = false;

var horizontalVelocity = 5;
var birdXPosition = 100;

function setup() {
    createCanvas(800,600);
    var pipesCount = 3;
    var padding = width / pipesCount;
    pipes = new Pipes(pipesCount, padding, horizontalVelocity);

    bird = new Bird(10, height/2, 30);
    bird.v.x = horizontalVelocity;

    gravity = createVector(0,0.3);
}

function mousePressed() {

    running = true;
    if (bird.v.y > 0) {
        bird.v.y = -5;
    } else {
        bird.v.y -= 5;
    }
    bird.v.y = constrain(bird.v.y, -10, 10);

}

function draw() {
    background(0);
    fill(200,200,200,100);
    stroke(200);
    bird.show(birdXPosition);
    pipes.show();
    showUi();

    if (!running) {
        return;
    }

    bird.applyForce(gravity);
    bird.update();
    pipes.update();
    if (pipes.isColliding(bird, birdXPosition)) {
        pipes.recycle();
        bird.pos.y = height/2;
        bird.v.y = 0;
        running = false;
        score = 0;
    }
}

function showUi() {
    textSize(22);
    text("Score: " + score, width - 100, 20);
    text("Best: " + best, width - 100, 40);
}
