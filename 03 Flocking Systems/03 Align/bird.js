function Bird(x, y, size) {

    this.size = size;

    this.pos = createVector(x,y);
    this.v = createVector();
    this.a = createVector();

    //These two props are renamed
    this.maxVelocity = 3;
    this.maxForce = 0.2;

    /**
    * So here is the new steer behavior
    * It tries to align the birds velocity to the average velocity of its neighbours
    */
    this.align = function(birds) {

        var r = createVector();
        var desire = createVector();
        var count = 0;

        //loop through all the birds and see which are in range
        for (var i = 0; i < birds.length; i++) {
            var bird = birds[i];

            //When this is the same bird as this bird, so skip this loop step
            if (this == bird) {
                continue;
            }

            //Compute the vector pointing from the i-th bird and this bird
            r.set(bird.pos.x - this.pos.x, bird.pos.y - this.pos.y);

            //Use the mag() method to get the distance
            var d = r.mag();

            //Skip the loop step if the i-th bird is not in range
            if (d > 50) {
                continue;
            }

            //Accumulate the i-th bird's velocity into the desired vector
            desire.add(bird.v);
            //And also keep track of the total birds in range
            count++;
        }

        //Apparently no birds are in range, so our job here is done 
        if (count == 0) {
            return;
        }

        //Devide the desire vector by the count in order to average it
        //Psst! Is this step really neccessary?
        desire.div(count);

        //Now just set its magnitute to the maxVelocity
        desire.setMag(this.maxVelocity);

        //substract the this bird's velocity from the desire in order to get the force
        desire.sub(this.v);
        desire.limit(this.maxForce);

        //Apply it
        this.applyForce(desire);

    }

    //From this point here the code is the same as the code of the seek steering behavior
    //Check it in GitHub for more detailed comments

    this.seek = function(target) {
        var desire = p5.Vector.sub(target, this.pos);

        var d = desire.mag();
        var newMag = map(d, 0, 100, 0, this.maxVelocity);
        newMag = constrain(newMag, 0, this.maxVelocity);
        desire.setMag(newMag);

        var seekForce = p5.Vector.sub(desire, this.v);
        seekForce.limit(this.maxForce);
        this.applyForce(seekForce);
    }



    this.applyForce = function(force) {
        this.a.add(force);
    }
    this.update = function() {
        this.v.add(this.a);

        //We must limit the velocity here
        //Because all the forces we are applying may result as large velocities
        this.v.limit(this.maxVelocity)

        this.pos.add(this.v);
        this.a.mult(0);

        //Well this part is also new
        //Just bend the space to a donut :)
        if (this.pos.x < 0) {
            this.pos.x = width + this.pos.x
        }
        if (this.pos.x > width) {
            this.pos.x = width - this.pos.x
        }
        if (this.pos.y < 0) {
            this.pos.y = height + this.pos.y
        }
        if (this.pos.y > height) {
            this.pos.y = height - this.pos.y
        }

    }

    this.show = function() {

        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.v.heading());
        beginShape();
            vertex(-this.size/2, -this.size/4);
            vertex(this.size/2, 0);
            vertex(-this.size/2, this.size/4);
        endShape(CLOSE);
        pop();
    }

}
