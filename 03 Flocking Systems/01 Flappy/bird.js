function Bird(x, y, size) {

    this.size = size;
    this.pos = createVector(x,y);

    this.v = createVector();
    this.a = createVector();

    this.applyForce = function(force) {
        this.a.add(force);
    }

    this.update = function() {
        this.v.add(this.a);
        this.pos.add(this.v);

        this.a.mult(0);
    }

    this.show = function(fixedX) {

        push();
        translate(fixedX, this.pos.y);
        rotate(this.v.heading());
        beginShape();
            vertex(-this.size/2, -this.size/4);
            vertex(this.size/2, 0);
            vertex(-this.size/2, this.size/4);
        endShape(CLOSE);
        pop();
    }

}
