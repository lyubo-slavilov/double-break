function Pipes(pipesCount, padding, velocity) {
    this.pipeW = 100;
    this.pipes = [];
    this.velocity = velocity;
    this.padding = padding;

    this.init  = function() {
        //Make the offset large enought so that only the first pipe is vissible
        var offset = width - this.padding;

        //Create the pipes as literal objects
        for (var i = 0; i < pipesCount; i++) {
            var pipe = {
                x: offset,
                y: random(0, height - 150),
                g: random(80, 150)
            }

            offset += this.pipeW + random(0.9*this.padding, 1.1 * this.padding);
            this.pipes.push(pipe);
        }
    }

    //Recycles the first pipe
    this.recycle = function() {

        var pipe = this.pipes.shift();
        var last = this.pipes[this.pipes.length -1];

        pipe.x = last.x + this.pipeW + random(0.9*this.padding, 1.1 * this.padding);
        pipe.y = random(0, height - 150);
        pipe.g = random(80, 150);

        this.pipes.push(pipe);
    }

    this.update = function() {
        var doRecycle = false;

        for (var i = 0; i < this.pipes.length; i++) {
            var pipe = this.pipes[i];
            pipe.x -= this.velocity;
            if (pipe.x + this.pipeW < 0) {
                doRecycle = true;
            }
        }

        //Do the actual recycling after the loop above
        //otherwise we will mess-up the loop and the second
        //pipe will not be updated
        if (doRecycle) {
            score += 1;
            best = max(best, score);
            this.recycle();
        }
    }

    this.show = function() {
        for (var i = 0; i < this.pipes.length; i++) {
            var pipe = this.pipes[i];

            rect(pipe.x, 0, this.pipeW, pipe.y);
            rect(pipe.x, pipe.y + pipe.g, this.pipeW, height  - pipe.y - pipe.g);
        }
    }

    //Nothing fancy here
    //just check if the center of the bird is somwhere that
    //it is not supposed to be
    this.isColliding = function(bird, birdFixedX) {
        for (var i = 0; i < this.pipes.length; i++) {
            var pipe = this.pipes[i];

            if (bird.pos.y < 0 || bird.pos.y > height) {
                return true;
            }

            if (birdFixedX > pipe.x && birdFixedX < pipe.x + this.pipeW) {

                if (bird.pos.y > 0 && bird.pos.y < pipe.y) {
                    return true;
                }

                if (bird.pos.y > pipe.y+pipe.g && bird.pos.y < height) {
                    return true;
                }

            }
        }
    }
    this.init();
}
