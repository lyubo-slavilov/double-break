//Very simple object
//Just draws a line between seed-seed, seed-particle, particle-particle pairs
function Edge(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;



    this.show = function() {


        //Skip the drawing process if we have normal, but invisible particle involved
        if (this.p1.type == 'particle' && !this.p1.visible()) {
            return;
        }
        if (this.p2.type == 'particle' && !this.p2.visible()) {
            return;
        }

        //Also sklip the drawing process if particless are too far apart
        var d = distSq(this.p1, this.p2);
        if (d > 200*200) {
            return;
        }

        //Add some opacity to mimic stretching effect over the edge.
        var opacity = map(d, 0, 200*200, 100, 0);
        stroke(255, 255, 255, opacity);

        line(this.p1.pos.x, this.p1.pos.y, this.p2.pos.x, this.p2.pos.y);

    }
}
