var pipes;
var bird;
var gravity;

var score = 0;
var best = 0;
var running = false;

var initialHorizontalVelocity = 5;
var currentHorizontalVelocity = initialHorizontalVelocity;
//we are doubling the velocity in a span of 10 000 frames
//you can update this value to make the speed rise at a different rate
const horizontalVelocityCoef = initialHorizontalVelocity / 10000;
//this indicates the maximum velocity after which we stop adding the coef
var maxHorizontalVelocity = initialHorizontalVelocity * 2;
var birdXPosition = 100;

function setup() {
    createCanvas(800,600);
    var pipesCount = 3;
    var padding = width / pipesCount;
    pipes = new Pipes(pipesCount, padding, initialHorizontalVelocity);

    bird = new Bird(10, height/2, 30);
    bird.v.x = initialHorizontalVelocity;

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
    updateSpeed();
    if (pipes.isColliding(bird, birdXPosition)) {
        pipes.recycle();
        bird.pos.y = height/2;
        bird.v.y = 0;
        running = false;
        score = 0;
        //we should reset the velocity after each death so it can start at 5
        currentHorizontalVelocity = initialHorizontalVelocity;
    }
}

function updateSpeed(){
  //we add the coef
  currentHorizontalVelocity += horizontalVelocityCoef;
  //we constrain the velocity otherwise it will rise indefinitelly making the game impossible after a while
  constrain(currentHorizontalVelocity,initialHorizontalVelocity,maxHorizontalVelocity)
  //we set the new velocity for the pipes
  pipes.velocity = currentHorizontalVelocity;
}

function showUi() {
    textSize(22);
    text("Score: " + score, width - 100, 20);
    text("Best: " + best, width - 100, 40);
}
