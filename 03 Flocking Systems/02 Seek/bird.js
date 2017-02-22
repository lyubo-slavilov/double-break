function Bird(x, y, size) {

    this.size = size;

    //Our simple phisics stuff
    this.pos = createVector(x,y);
    this.v = createVector();
    this.a = createVector();

    //Seek steering behavior maximum limits
    this.maxSeekVelocity = 10;
    this.maxSeekForce = 10;

    //This comment is ridiculous :)
    this.applyForce = function(force) {
        this.a.add(force);
    }

    //This is our seek method which is the main point of the whole video
    this.seek = function(target) {
        //Compute the desire vector as the differance of the
        // target and the current position
        var desire = p5.Vector.sub(target, this.pos);

        //Get its magnitute as a distance
        var d = desire.mag();

        //Now we have to limit the magnitute of the desire,
        // but here is the ARRIVAL part of the algorithm also

        //Map the distance against the radius of influence
        //and get the new magnitute at same rate
        var newMag = map(d, 0, 100, 0, this.maxSeekVelocity);

        //Constrain it in case it goes wild anyway
        newMag = constrain(newMag, 0, this.maxSeekVelocity);

        //Rescale the vector with the computed magnitute
        desire.setMag(newMag);

        //The seek force is the differance of the desired and the current velocity
        //You can think of this as a velocity error correction also
        var seekForce = p5.Vector.sub(desire, this.v);

        //Limit the force and apply it to the bird
        seekForce.limit(this.maxSeekForce);
        this.applyForce(seekForce);
    }


    //Our simple phisics stuff again
    this.update = function() {
        this.v.add(this.a);
        this.pos.add(this.v);

        this.a.mult(0);
    }

    //Displays the bird.
    //More on this in the Flappy Bird videos
    this.show = function() {

        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.v.heading());
        beginShape();
            fill(200,200,200,80)
            vertex(-this.size/2, -this.size/4);
            vertex(this.size/2, 0);
            vertex(-this.size/2, this.size/4);
        endShape(CLOSE);
        pop();
    }

}
