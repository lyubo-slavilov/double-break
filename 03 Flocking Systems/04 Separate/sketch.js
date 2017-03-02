var birds = [];

//Lets put some sliders to control the flocking behavior
var sepSlider;
var algnSlider;

function setup() {
    createCanvas(800,600);

    var bird = new Bird(random(width), random(height), 20);
    bird.v.set(random(-3,3), random(-3,3));
    birds.push(bird);

    //Create the sliders
    sepSlider = createSlider(0, 5, 1, 0.1); //from 0 to 5 with initial value of 1 and change step of 0.1
    algnSlider = createSlider(0, 5, 1, 0.1); //from 0 to 5 with initial value of 1 and change step of 0.1
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
    
    //Here we are using sliders' values for steering weights
    for (var i = 0; i < birds.length; i++) {
        birds[i].separate(birds, sepSlider.value());
        birds[i].align(birds, algnSlider.value());
        birds[i].update();
        birds[i].show();
    }

}
