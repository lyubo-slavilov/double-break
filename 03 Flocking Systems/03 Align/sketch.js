/**
* Nothing fancy and new here. It is very similar to the seek steering behavior
*/

birds = [];

function setup() {
    createCanvas(800,600);

    var bird = new Bird(random(width), random(height), 20);
    bird.v.set(random(-3,3), random(-3,3));
    birds.push(bird)
}

//Here is the unique part.
//Instead of tracking the mouse clicks, we are listening to the keyboard keys
function keyPressed() {
    if (key == ' ') {
        //Put a hundred new birds in the array
        for (var i = 0; i < 100; i++) {
            var bird = new Bird(random(width), random(height), 20);
            bird.v.set(random(-3,3), random(-3,3));
            birds.push(bird);
        }
    }
}

//At every animation frame
function draw() {
    background(53);

    for (var i = 0; i < birds.length; i++) {

        //Align the birds velocity to the neighbours velocities
        birds[i].align(birds);

        birds[i].update();
        birds[i].show();
    }

}
