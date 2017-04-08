function Rocket(x, y) {
    this.pos = createVector(x, y);
    this.v = createVector();
    this.a = createVector();

    this.pitch = -PI / 2;

    this.size = 100;
    this.locked = true;

    this.engineOn = false;
    this.TM = 1.001;
    this.fuel = 20000;
    this.applyForce = function(force) {
        this.a.add(force);
    }

    this.trust = function() {

        if (this.engineOn && this.fuel > 0) {

            var t = createVector(this.TM * 20000 / this.fuel, 0);
            t.rotate(this.pitch);
            this.applyForce(t);
            this.fuel -= 2;
            if (this.fuel <= 0) {
                this.engineOn = false
            }
        }
    }

    this.steer = function() {
        if (keyIsPressed) {
            if (keyCode == RIGHT_ARROW) {
                rocket.pitch += 0.01;
            }
            if (keyCode == LEFT_ARROW) {
                rocket.pitch -= 0.01;
            }
        }
    }

    this.update = function() {
        if (!this.locked) {

            this.trust();
            this.steer();

            this.v.add(this.a);
            this.pos.add(this.v);
        }

        this.a.mult(0);
    }

    this.show = function() {
        var sz = scl * this.size;

        sz = max(sz, 20);
        push();
            translate(scl * this.pos.x, scl * this.pos.y - sz / 2);
            rotate(this.pitch);

            //draw the rocket (triangle)
            beginShape();
                vertex(-sz / 2, -sz / 4);
                vertex(sz / 2, 0);
                vertex(-sz / 2, sz / 4);
            endShape(CLOSE);

            //Draw the exhaust jets
            if (this.engineOn) {
                noStroke();

                colorMode(HSB);
                fill(random(0, 40),255,100);
                rect(-sz / 2 - sz/4, -sz /4, sz/4, sz/8);
                fill(random(0, 40),255,100);
                rect(-sz / 2 - sz/2, -sz /4 + sz / 8, sz/2, sz/8);
                fill(random(0, 40),255,100);
                rect(-sz / 2 - sz/2, -sz /4 + 2*sz / 8, sz/2, sz/8);
                fill(random(0, 40),255,100);
                rect(-sz / 2 - sz/4, -sz /4+  3*sz / 8, sz/4, sz/8);
            }

        pop();
    }



    this.showTrajectory = function() {

        var pos = this.pos.copy();
        var v = this.v.copy();
        var g = gravity.copy();
        var cx, cy, nx, ny;
        var gms;
        stroke(0, 200, 0);
        cx = scl*pos.x;
        cy = scl*pos.y;
        for (var i = 0; i < 100000; i++) {

            gms = pos.magSq();
            g.set(-pos.x, -pos.y);

            pos.add(v);

            if (i % 100 == 0) {
                if(pos.mag() < earth.radius) {
                    //STOP drawing if the trajectory goes in the earth
                    break;
                }
                nx = scl*pos.x;
                ny = scl*pos.y;
                line(cx, cy, nx, ny);
                cx = nx;
                cy = ny;

            }

            g.setMag(GC /gms);
            v.add(g);
        }

    }
}
