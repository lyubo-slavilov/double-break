function Ball(pos, size) {
    this.size = size;

    this.pos = pos;
    this.v = createVector(0,0);
    this.a = createVector(0,0);

    this.angle = 0;
    this.omega = 0;
    this.beta = 0;

    this.mass = function() {
        return this.size * this.size;
    }

    this.applyTorque = function(torque) {
        this.beta += torque*0.001;
    }

    this.applyForce = function(force) {
        this.a.add(force);
    }

    this.update = function() {

        //integrate to get the position
        this.v.add(this.a);
        this.pos.x += this.v.x;
        this.pos.y += this.v.y;

        //integrate to get the rotation
        this.omega += this.beta;
        this.angle += this.omega;
        this.beta = 0;

        //Wall conditions
        //If the ball crosses a wall, let say wit X pixels, we will push it
        //aside of the wall with same amout of X pixels.
        //We will reflect the coresponding velocity component accordingly
        var diff;

        diff = this.pos.x - this.size/2;
        if(diff < 0) {
            this.pos.x += -2*diff;
            this.v.x *= -1;
        }
        diff = this.pos.y - this.size/2;
        if(diff < 0) {
            this.pos.y += -2*diff;
            this.v.y *= -1;
        }

        diff = width - this.pos.x - this.size/2;
        if(diff < 0) {
            this.pos.x += 2*diff;
            this.v.x *= -1;
        }

        diff = height - this.pos.y - this.size/2;
        if(diff < 0) {
            this.pos.y += 2*diff;
            this.v.y *= -1;
        }

        //Clen up the acceleration
        this.a.mult(0);
    }

    this.show = function() {
        stroke(200);
        fill(200,200,200,100);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);

        push();
            stroke(255);
            translate(this.pos.x, this.pos.y);
            rotate(this.angle);
            line(0, this.size/2, 0, -this.size/2);
        pop();
    }
}
