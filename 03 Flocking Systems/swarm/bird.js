function Bird(x, y, size) {

    this.size = size;
    this.prevPos = createVector(x,y);
    this.pos = createVector(x,y);

    this.v = createVector();
    this.a = createVector();
    this.fill = [200,200,200,100];

    this.maxVelocity = 3;
    this.maxForce = 0.05;

    this.fov = 50;

    this.align = function(birds, weight) {
        r.set(0,0);
        desire.set(0,0);
        var count = 0;
        for (var i = 0; i < birds.length; i++) {
            var bird = birds[i];

            if (this == bird) {
                continue;
            }

            r.set(bird.pos.x - this.pos.x, bird.pos.y - this.pos.y);
            var d = r.mag();
            debug++;

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
        r.set(0,0);
        desire.set(0,0);
        var count = 0;
        for (var i = 0; i < birds.length; i++) {
            var bird = birds[i];
            if (bird == this) {
                continue;
            }
            r.set(this.pos.x - bird.pos.x, this.pos.y - bird.pos.y);
            var d = r.mag();
            debug++;

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
        r.set(0,0);
        desire.set(0,0);
        var count = 0;


        for (var i = 0; i < birds.length; i++) {
            var bird = birds[i];
            if (bird == this) {
                continue;
            }
            r.set(this.pos.x - bird.pos.x, this.pos.y - bird.pos.y);
            var d = r.mag();
            debug ++;

            if (d > this.fov) {
                continue;
            }
            desire.add(bird.pos);
            count ++;
        }

        if (count == 0 ) {
            return;
        }
        desire.div(count);

        this.seek(desire, weight);
    }

    this.seek = function(target, weight) {
        desire.set(target.x - this.pos.x, target.y - this.pos.y);

        desire.limit(this.maxVelocity);

        desire.sub(this.v);
        desire.limit(this.maxForce);

        desire.mult(weight);
        this.applyForce(desire);
    }



    this.applyForce = function(force) {
        this.a.add(force);
    }
    this.update = function() {
        this.v.add(this.a);
        this.v.limit(this.maxVelocity)

        this.prevPos.set(this.pos.x, this.pos.y);
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
