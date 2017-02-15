var poisson;

function setup() {
	createCanvas(800, 800);
	background(0);
	//Create the poisson disc sampler
    poisson = new Poisson(20, 30);
}

//At each animation frame...
function draw() {
    background(0);

	//Run the sampling process once
    poisson.run();
	//Draw it
    poisson.show();

}
