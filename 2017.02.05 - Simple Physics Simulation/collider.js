function Collider(balls) {
    this.balls = balls;
    this.collisions = [];

    this.checkCollisions = function()
    {
        //reset the list with collisions
        for (var i = 0; i < this.balls.length; i++) {
            this.collisions[i] = -1;
        }

        //Check every ball against every other
        for (var i = 0; i < this.balls.length; i++) {

            //I wonder if this ball already was marked as a collision participant
            if (this.collisions[i] == -2) {
                continue;
            }

            //Let's check all other balls
            for (var j = 0; j < this.balls.length; j++) {

                //Look Mom, I am intersecting with myself - what to do!? :)
                if (i == j) {
                    continue;
                }

                //If i-th and j-th intersects, write somewhere that i-th collides with j-th
                //and j-th will no more be interesting
                if (this.intersect(this.balls[i], this.balls[j])) {
                        this.collisions[i] = j;
                        this.collisions[j] = -2;
                }
            }
        }
    }

    this.roll = function(ball1, ball2) {
        var collisionV = p5.Vector.add(ball1.v, ball2.v);

        //Find the radius-vecor pointing from the center
        //of ball1 to the point of contact
        var r  = p5.Vector.sub(ball2.pos, ball1.pos)
        r.normalize().mult( ball1.size/2);

        //Compute the torque as a cross product and apply it
        var m = p5.Vector.cross(r, collisionV);
        ball1.applyTorque(m.z);


        //Do the same stuff with ball2
        r  = p5.Vector.sub(ball2.pos, ball1.pos);
        r.normalize().mult( ball1.size/2);
        var m = p5.Vector.cross(r, collisionV);
        ball2.applyTorque(m.z);

    }

    this.intersect = function(ball1, ball2) {
        var sumRSq = (ball1.size + ball2.size)*(ball1.size + ball2.size)/4;

        var disSq = (ball2.pos.x - ball1.pos.x)*(ball2.pos.x - ball1.pos.x)
                + (ball2.pos.y - ball1.pos.y)*(ball2.pos.y - ball1.pos.y);

        //Two balls intersect if the sum of their radiuses is bigger than the
        //distance between their centres (squared norms are used for performacne reasons)
        return disSq <= sumRSq;


    }

    this.resolveCollisions = function() {
        //Just loop over all collisions stored and
        //1. push balls arrownd to remove any intersection
        //2. Transfer angular moment
        //3. Transfer impulse
        for (var i = 0; i < this.collisions.length; i++) {
            if (this.collisions[i] >= 0) {
                var ball1 = this.balls[i];
                var ball2 = this.balls[this.collisions[i]];
                this.resolveIntersection(ball1, ball2);
                this.roll(ball1, ball2);
                this.collide(ball1, ball2);
            }
        }
    }

    this.resolveIntersection = function(ball1, ball2) {
        //MTD implementation
        //There is a whole video part dedicated to this technique
        //Video: https://youtu.be/2qDCEKhG3Mg


        var normal = p5.Vector.sub(ball2.pos, ball1.pos);
        var d = normal.mag();


        var m1 = ball1.mass();
        var m2 = ball2.mass();
        var r1 = ball1.size / 2;
        var r2 = ball2.size / 2;

        var mtd = p5.Vector.mult(normal, (r1 + r2 - d) / d);
        ball1.pos.sub(p5.Vector.mult(mtd, m2 / (m1+m2)));
        ball2.pos.add(p5.Vector.mult(mtd, m1 / (m1+m2)));

    }


    this.collide = function(ball1 , ball2) {


        //Compute the normal velocities of each ball and
        //use the formulas to compute the new normal velocities
        //Again, there is a video which is all about this
        //Video: https://youtu.be/2qDCEKhG3Mg

        var normal = p5.Vector.sub(ball2.pos, ball1.pos);
        normal.normalize();

        var tangent = createVector(-normal.y, normal.x);

        var v1n = p5.Vector.dot(normal, ball1.v);
        var v1t = p5.Vector.dot(tangent, ball1.v);

        var v2n = p5.Vector.dot(normal, ball2.v);
        var v2t = p5.Vector.dot(tangent, ball2.v);

        var m1 = ball1.mass();
        var m2 = ball2.mass();

        //These are the magic formulas
        //They are derived in a separate video
        //Video: https://youtu.be/-2f2jL9amfc
        var v1nn = (v1n*(m1-m2) + 2*m2*v2n )/(m1+m2);
        var v2nn = (v2n*(m2-m1) + 2*m1*v1n )/(m1+m2);

        var v1nVV = p5.Vector.mult(normal, v1nn);
        var v2nVV = p5.Vector.mult(normal, v2nn);

        v1t = p5.Vector.mult(tangent, v1t);
        v2t = p5.Vector.mult(tangent, v2t);

        ball1.v = p5.Vector.add(v1nVV, v1t);
        ball2.v = p5.Vector.add(v2nVV, v2t);

    }

}
