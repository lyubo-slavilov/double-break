function Particle(x, y) {
    this.pos = createVector(x, y);
    this.v = createVector();
    this.a = createVector();
    this.locked = false;

    this.update = function() {

        if (!this.locked) {
            this.v.add(this.a);
            this.v.mult(0.95)
            this.pos.add(this.v);
        }
        this.a.mult(0);
    }

    this.applyForce = function(force) {
        this.a.add(force);
    }



    this.show = function() {
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
    }

    //This is almost the same as the seek steering bahavior...
    //If you want to know more go to the flocking systems series https://goo.gl/ox7x3l
    this.flee = function(target) {
        var r = p5.Vector.sub(target, this.pos);
        if (r.mag() > 50) {
            return;
        }
        r.sub(this.v);
        r.limit(0.5);
        r.mult(-1);

        this.applyForce(r);
    }

}
