function Spring(p1, p2, strenght) {

    this.p1 = p1;
    this.p2 = p2;
    this.strenght = strenght;
    this.l = p5.Vector.dist(p1.pos, p2.pos);


    this.show = function() {
        stroke(0);
        strokeWeight(1);
        line(this.p1.pos.x, this.p1.pos.y, this.p2.pos.x, this.p2.pos.y);
    }

    //Here is the magic
    this.apply = function() {

        var r = p5.Vector.sub(this.p2.pos, this.p1.pos);
        var cl = p5.Vector.dist(p1.pos, p2.pos);
        var dl = this.l - cl;

        //Compute the spring force according to the Hooks law
        var m = dl * this.strenght;
        r.setMag(m);

        this.p2.applyForce(r);
        r.mult(-1);
        this.p1.applyForce(r);

    }
}
