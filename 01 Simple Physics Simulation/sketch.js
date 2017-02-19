var balls = [];
var gravity;
var collider;
function setup() {
    //Setup the scene
	createCanvas(800, 800);
	background(100);

    //Creata a gravity force vector
    gravity = createVector(0,0.05);

    //Create a number of balls which will be part of our physics
    var pos, ball;
    for (var i = 0; i < 30; i++) {
        pos = createVector(random(20, 380), random(10, 80));
        ball = new Ball(pos, random(25, 50));
        //randomize the velocity a little
        ball.v.x = random(-1,1);

        //Add the ball to the balls list
        balls.push(ball);
    }
    collider = new Collider(balls);
}

//At each animation frame
function draw() {

    //clear the canvas
    background(0);

    //check and resolve collisions
    collider.checkCollisions();
    collider.resolveCollisions();


    //Apply force to every ball, update it and draw it
    for (var i = 0; i < balls.length; i++) {
        balls[i].applyForce(gravity);
        balls[i].update();
        balls[i].show();
    }

}
