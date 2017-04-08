var earth ;
var rocket;
var cam;
var scl = 1;
var gravity;
var GM = 1;
var GC;

var tres = 1;
focusOnRocket = true;
function setup() {
	createCanvas(800, 800);
	background(0);

    earth = new Earth();

    GC = GM * earth.radius * earth.radius;

    rocket = new Rocket(0, -earth.radius);
    cam = createVector(0, 0);
    gravity = createVector(0, GM);

}

function keyPressed() {
    if (key == 'R') {
        focusOnRocket = !focusOnRocket;
    }

    if (key == ' ') {
        rocket.locked = false;
        rocket.engineOn = ! rocket.engineOn;
    }


}

function mouseWheel(e) {
    if (e.delta > 0) {
        scl = scl * 0.9;
    } else {
        scl = scl / 0.9;
    }

    scl = min(scl, 5);
}

function draw() {

    background(0);

    if (focusOnRocket) {
        cam.set(-scl*rocket.pos.x, -scl*rocket.pos.y);
    } else {
        cam.set(0,0);
    }

    for (var t = 0; t < tres; t++) {
        var gms = rocket.pos.magSq();
        gravity.set(-rocket.pos.x, -rocket.pos.y);
        gravity.setMag(GC / gms);

        rocket.applyForce(gravity);
        rocket.update();
    }
    
    textSize(20);
    noStroke();
    fill(255);
    var altitude = nfc((rocket.pos.mag() - earth.radius)/100, 1);
    text('Altitude: ' + altitude, width - 150, 20);
    text('Fuel: ' + rocket.fuel, width - 150, 42);

    push();
        translate(width/2, height / 2);
        translate(cam.x, cam.y);

        earth.show();
        rocket.show();
        rocket.showTrajectory();

    pop();
}
