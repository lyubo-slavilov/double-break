var birds = [];
var sepSlider, algnSliver, cohSlider;

function setup() {
    createCanvas(800,600);

    var bird = new Bird(random(width), random(height), 20);
    bird.v.set(random(-3,3), random(-3,3));
    birds.push(bird);
    
    var div = createDiv('Separate: ');
    sepSlider = createSlider(0, 5, 1.5, 0.1); //Slider from 0 to 5 with current value of 1.5 and step size of 0.1
    sepSlider.parent(div);
    
    var div = createDiv('Align: ');
    algnSlider = createSlider(0, 5, 1, 0.1); //Slider from 0 to 5 with current value of 1 and step size of 0.1
    algnSlider.parent(div);
    
    var div = createDiv('Cohesion: ');
    cohSlider = createSlider(0, 5, 1.5, 0.1); //Slider from 0 to 5 with current value of 1 and step size of 0.1
    cohSlider.parent(div);
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
        birds[i].separate(birds, sepSlider.value());
        birds[i].cohesion(birds, cohSlider.value());
        birds[i].align(birds, algnSlider.value());
        birds[i].update();
        birds[i].show();
    }
}
