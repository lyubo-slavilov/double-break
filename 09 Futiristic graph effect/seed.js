function Seed(x, y) {
    //this is the seed anchor position and it is never updated
    this.anchor = createVector(x, y);

    //this is the updated position which wiggles arrownd the anchor
    this.pos = this.anchor.copy();

    //Noise offsets to produce more organic feel
    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = random(1000);

    this.excited = false;
    this.type = 'seed';

    this.update = function() {

        //Play with this number to produce different wiggle behaviours
        var wiggle = 150;
        var wiggleScale = 1/500;

        //Calculate the wiggle components by using perlin noise
        wx = noise((this.noiseOffsetX + frameCount) * wiggleScale);
        wy = noise((this.noiseOffsetY + frameCount) * wiggleScale);


        //Apply the scaled wiggle components to the position
        this.pos.x = this.anchor.x + map(wx, 0, 1, -wiggle, wiggle);
        this.pos.y = this.anchor.y + map(wy, 0, 1, -wiggle, wiggle);

        //Excite the seed if it is close to the mouse cursor
        this.excited = dist(mouseX, mouseY, this.pos.x, this.pos.y) <= 100;


    }

    this.show = function() {
        noStroke();
        fill(255);
        ellipse(this.pos.x, this.pos.y, 5, 5);
    }
}
