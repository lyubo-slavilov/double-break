function Flowfield(size) {
    this.size = size;
    this.rows = ceil(height / size);
    this.cols = ceil(width / size);
    this.scl = 0.1;
    this.angles = [];
    this.t = 0;

    for (var j = 0; j < this.rows; j++) {
        for (var i = 0; i <  this.cols; i++) {
            var a = noise(i*this.scl, j * this.scl, 0)*TWO_PI;
            this.angles.push(a);
        }
    }


    this.update = function() {
        for (var j = 0; j < this.rows; j++) {
            for (var i = 0; i <  this.cols; i++) {
                var a = noise(i*this.scl, j * this.scl, this.t)*TWO_PI;
                var index = i + j*this.cols;
                this.angles[index] = a;
            }
        }
        this.t += 0.01;
    }

    this.show = function() {
        stroke(255);
        strokeWeight(1);
        for (var j = 0; j < this.rows; j++) {
            for (var i = 0; i <  this.cols; i++) {
                var index = i + j*this.cols;

                var a = this.angles[index];

                push();
                translate(i*this.size, j*this.size);
                rotate(a);

                line(0,0,this.size, 0);
                pop();
            }
        }
    }

    this.angleAt = function(pos) {
        var i = floor(pos.x / this.size);
        var j = floor(pos.y / this.size);

        var index = i + j * this.cols;

        return this.angles[index];
    }
}
