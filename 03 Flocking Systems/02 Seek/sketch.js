var birds = [];
function setup() {
    createCanvas(800,600);

    //Put our first bird in the birds array
    var bird = new Bird(width/2, height/2, 30);
    bird.v.x = 10;
    bird.v.y = 3;
    birds.push(bird);
}

//When the mouse is pressed
function mousePressed() {
    //Create new bird
    var bird = new Bird(width/2, height/2, 30);

    //Randomize its maxSeekVelocity and maxSeekForce
    bird.maxSeekForce = random(0.1,2);
    bird.maxSeekVelocity = random(3,10);

    //Put it into the array
    birds.push(bird);
}

function draw() {

    background(0);

    stroke(200);
    fill(200,200,200,80);


    for (var i = 0; i < birds.length; i++) {
        //seek the mouse
        birds[i].seek(createVector(mouseX, mouseY));
        //update the bird
        birds[i].update();
        //display it
        birds[i].show();
    }
}
