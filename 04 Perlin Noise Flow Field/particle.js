function Particle()  {

    this.pos = createVector(random(width), random(height));
    this.prev = createVector(this.pos.x, this.pos.y);

    this.v = p5.Vector.random2D();
    this.v.mult(3);
    this.a = createVector();

    this.update = function() {
        this.prev.set(this.pos.x, this.pos.y)
        this.v.add(this.a);
        this.v.limit(5);
        this.pos.add(this.v);

        if (this.pos.x < 0) {
            this.pos.x = width;
            this.prev.x = width;
        }

        if (this.pos.x > width) {
            this.pos.x = 0;
            this.prev.x = 0;
        }

        if (this.pos.y < 0) {
            this.pos.y = height;
            this.prev.y = height;
        }

        if (this.pos.y > height) {
            this.pos.y = 0;
            this.prev.y = 0;
        }

        this.a.mult(0);
    }

    this.applyForce = function(force) {
        this.a.add(force);
    }

    this.show = function() {

        var h = frameCount % 400;

        h = map(h, 0, 400, 0, 40);

        h  = floor(h);

        stroke(h,255,100,0.03);
        strokeWeight(4);
        line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
    }
}
