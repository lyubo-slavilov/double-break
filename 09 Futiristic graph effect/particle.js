//Almost the same as the Seed

function Particle(seed) {

    //This line here is the crutial differance from Seed object
    //We set the anchor of the particle as a referance to the position of the seed
    //this way the anchor will move with the wiggling seed 'automatically'
    this.anchor = seed.pos;


    this.pos = this.anchor.copy();
    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = random(1000);
    this.seed = seed;
    this.type = 'particle';

    this.update = function() {

        var wx, wy;

        //Play with this numbers to produce different wiggle behaviours
        var wiggle = 300;
        var wiggleScale = 1/50;

        //Calculate the wiggle components by using perlin noise
        wx = noise((this.noiseOffsetX + frameCount) * wiggleScale);
        wy = noise((this.noiseOffsetY + frameCount) * wiggleScale);

        //Apply the scaled wiggle components to the position
        this.pos.x = this.anchor.x + map(wx, 0, 1, -wiggle, wiggle);
        this.pos.y = this.anchor.y + map(wy, 0, 1, -wiggle, wiggle);

    }

    this.show = function() {
        if (!this.visible()) {
            return;
        }
        noStroke();
        fill(255);

        ellipse(this.pos.x, this.pos.y, 5, 5);
    }

    this.visible = function() {
        return this.seed.excited;
    }
}
