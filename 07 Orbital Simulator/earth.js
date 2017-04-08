//It is as dummy as it is
function Earth() {
    this.radius = 6*1000*1000;

    this.show = function() {
        stroke(255);
        fill(50,50,50);
        ellipse(0, 0, 2*scl*this.radius, 2*scl*this.radius);
    }
}
