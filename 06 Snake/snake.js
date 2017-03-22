function Snake() {

    //How much frames to skip before moving the snake acording its dir vector
    this.t = 5;

    //Snake's head
    this.head = createVector(cellSize, floor(height / cellSize) /2  * cellSize);
    //Snake's tail
    this.tail = [];
    //Represents the direction (and also the speed) of the snake's movement
    this.dir = createVector(cellSize, 0);


    //Nothing fancy here
    this.show = function() {
        //Draw the head as a rectangle
        fill(255);
        rect(this.head.x, this.head.y, cellSize, cellSize);

        fill(200);
        //Loop over all tail segments and draw them
        //also as rectangles
        for (var i = 0; i < this.tail.length; i++) {
            this.tail[i]
            rect(this.tail[i].x, this.tail[i].y, cellSize, cellSize);
        }
    }

    this.update = function() {
        //Here is this frame skipping thing
        if (frameCount % this.t !=  0) {
            return;
        }
        //Store the head's position in separate vector
        var prev = this.head.copy();
        //Update the head
        this.head.add(this.dir);
        //Put the head's prev position as a new tail segments
        //Notise we inject it into the beginning of the tail
        this.tail.unshift(prev);

        // if the head reached the apple, plant new apple
        if (this.head.x == apple.x && this.head.y == apple.y) {
            plant();
        } else {
            //otherwise, kill the last tail segment
            this.tail.pop();
        }
    }
}
