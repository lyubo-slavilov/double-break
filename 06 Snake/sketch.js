var cellSize = 10;
var snake;
var apple;

function setup() {
	createCanvas(500, 500);
	background(0);
    snake = new Snake();
    apple = createVector();
    plant();
}

//Handle our keys
function keyPressed() {

    if (keyCode == UP_ARROW) {
        snake.dir.set(0, -cellSize);
    }
    if (keyCode == DOWN_ARROW) {
        snake.dir.set(0, cellSize);
    }
    if (keyCode == LEFT_ARROW) {
        snake.dir.set(-cellSize, 0);
    }
    if (keyCode == RIGHT_ARROW) {
        snake.dir.set(cellSize, 0);
    }
}

//Updates and draws our snake
//Draws the apple
function draw() {
    background(0);
    snake.update();
    snake.show();

    fill(0, 200, 0);
    rect(apple.x, apple.y, cellSize, cellSize);
}

//Plants the apple on random spot in the grid
function plant() {
    var i = floor(random(width / cellSize))
    var j = floor(random(height / cellSize))

    apple.set(i * cellSize, j * cellSize);
}
