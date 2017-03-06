function Bird(x, y, size) {

    this.size = size;
    this.pos = createVector(x,y);

    this.v = createVector();
    this.a = createVector();
    this.fill = [200,200,200,100];

    this.maxVelocity = 3;
    this.maxForce = 0.05;

    this.fov = 50;

    this.align = function(birds, weight) {
        var r = createVector();
        var desire = createVector();
        var count = 0;
        for (var i = 0; i < birds.length; i++) {
            var bird = birds[i];

            if (this == bird) {
                continue;
            }

            r.set(bird.pos.x - this.pos.x, bird.pos.y - this.pos.y);
            var d = r.mag();

            if (d > this.fov) {
                continue;
            }
            desire.add(bird.v);
            count++;
        }

        if (count == 0) {
            return;
        }

        desire.div(count);
        desire.setMag(this.maxVelocity);

        desire.sub(this.v);
        desire.limit(this.maxForce);
        desire.mult(weight);
        this.applyForce(desire);

    }

    this.separate = function(birds, weight) {

        var r = createVector();
        var desire = createVector();
        var count = 0;
        for (var i = 0; i < birds.length; i++) {
            var bird = birds[i];
            if (bird == this) {
                continue;
            }
            r.set(this.pos.x - bird.pos.x, this.pos.y - bird.pos.y);
            var d = r.mag();

            if (d > this.fov/2) {
                continue;
            }

            r.normalize();
            desire.add(r);
            count++;
        }

        if (count == 0) {
            return;
        }

        desire.div(count);
        desire.normalize();
        desire.mult(this.maxVelocity);

        desire.sub(this.v);
        desire.limit(this.maxForce);

        desire.mult(weight);
        this.applyForce(desire);
    }

    this.cohesion = function(birds, weight) {
        var avgPos = createVector();
        var count = 0;
        var r = createVector();

        for (var i = 0; i < birds.length; i++) {
            var bird = birds[i];
            if (bird == this) {
                continue;
            }
            r.set(this.pos.x - bird.pos.x, this.pos.y - bird.pos.y);
            var d = r.mag();

            if (d > this.fov) {
                continue;
            }
            avgPos.add(bird.pos);
            count ++;
        }

        if (count == 0 ) {
            return;
        }
        avgPos.div(count);

        this.seek(avgPos, weight);
    }

    this.seek = function(target, weight) {
        var desire = p5.Vector.sub(target, this.pos);

        desire.limit(this.maxVelocity);

        var seekForce = p5.Vector.sub(desire, this.v);
        seekForce.limit(this.maxForce);

        seekForce.mult(weight);
        this.applyForce(seekForce);
    }



    this.applyForce = function(force) {
        this.a.add(force);
    }
    this.update = function() {
        this.v.add(this.a);
        this.v.limit(this.maxVelocity)

        this.pos.add(this.v);

        if (this.pos.x < 0) {
            this.pos.x = width + this.pos.x
        }
        if (this.pos.x > width) {
            this.pos.x = this.pos.x - width
        }
        if (this.pos.y < 0) {
            this.pos.y = height + this.pos.y
        }
        if (this.pos.y > height) {
            this.pos.y = this.pos.y - height
        }
        this.a.mult(0);
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
