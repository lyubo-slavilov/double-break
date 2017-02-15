/**
	Based on the algorithm publiushed in this paper
	http://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf

*/

function Poisson (r, k) {
    this.r = r;
    this.k = k;

    this.grid = [];
    this.samples = [];
    this.active = [];

	//Precomupte the props of the  spatial grid helper
    this.cellSize = this.r / sqrt(2);
    this.cols = ceil(width/this.cellSize);
    this.rows = ceil(height/this.cellSize);

    this.init = function() {
	
		//Algorithm STEP-0
		
		//Initialize the spatial grid helper
        for (var i = 0; i < this.cols; i++) {
            for(var j = 0; j < this.rows; j++) {
                this.grid.push(-1);
            }
        }
		
		//Algorithm STEP-1
		//Pick the first sample and add it to the pools
        this.addSample(new Sample(width/2, height /2));

    }

    this.addSample = function(sample) {

		//Put the sample to the samples list
        this.samples.push(sample);
		
		//find its cell index
		var cellIndex = this.xy2i(sample.x, sample.y);
		//Store the sample's index into the cell
        this.grid[cellIndex] = this.samples.length -1;
		//Push it to the active list
        this.active.push(this.samples.length -1);
    }


	/**
	* This method performs one sampling step
	**/
    this.run = function()  {
		
		//Algorithm STEP-2
		
		//If the active list is empty get out of here
        if (this.active.length == 0) {
            return;
        }

		//Pick a random sample index from the active list
        var activeIndex = floor(random(this.active.length));
        var choosenIndex = this.active[activeIndex];
		
		//Fetch the sample
        var choosen = this.samples[choosenIndex];

        var success;
        var v;
        var newSapmple;
		
		//Try k times to generate new sample
        for (var t = 0; t < this.k; t++) {
            success = true;
			
			//Create the new sample as a point which is at random position
			//in the disk annulus from r to 2*r arrownd the choosen sample
            v = createVector(1,0);
            v.setMag(random(this.r, 2*this.r));
            v.rotate(random(0, TWO_PI));

            var x = choosen.x + v.x;
            var y = choosen.y + v.y;

            if (x < 0 || x >= width || y < 0 || y >= height) {
				//No luck for this coord. They are out of scene boundaries
                success = false;
                continue;
            }
            newSample = new Sample(x,y);

			//Find all the closest samples near the new sample
            closest = this.findClosest(newSample);

            if (closest.length > 0) {
                for (var i = 0; i < closest.length; i++) {
                    var d = this.distSquared(closest[i], newSample);
					//If there is an existing sample closeer than r,
					//reject this attempt and go trough the k-loop again
                    if (d < this.r*this.r) {
                        success = false;
                        break;
                    }
                }
            } else {
                break;
            }

            if (success) {
                break;
            }
        }

		//If there is legit generated sample, add it to the pools
		//Remove the choosen from the active list otherwise.
        if (success) {
            this.addSample(newSample);
        } else {
            this.active.splice(activeIndex, 1);
        }
    }


    this.distSquared = function(s1, s2) {
        return (s2.x - s1.x)*(s2.x - s1.x) + (s2.y - s1.y)*(s2.y - s1.y);
    }
	
	/**
	* Finds all the closest samples arrownd given sample
	* Uses the spatial grid helper for fast search
	*/
    this.findClosest = function(sample) {
        var index = this.xy2i(sample.x, sample.y);

        var closest = [];

		//All the neighbor cells indexes, including the current cell
        var indexes = [
            index - this.cols -1, index - this.cols, index - this.cols + 1,
            index - 1,  index,  index+1,
            index + this.cols - 1, index + this.cols, index + this.cols + 1,
        ]

		//loop through cells and see if there is positive index stored
        for (var i = 0; i < indexes.length; i++) {
            neightborIndex = indexes[i];
            if (neightborIndex >= 0 && neightborIndex < this.grid.length) {
                closest.push(neightborIndex);
            }
        }

		//fetch all the samples based to the extracted indexes
        var foundSamples = [];
        for (var i = 0; i < closest.length; i++) {
            if(this.grid[closest[i]] != -1) {
                foundSamples.push(this.samples[this.grid[closest[i]]]);
            }
        }


        return foundSamples;

    }

    this.show = function() {

        noFill();
        stroke(200);
        for (var i = 0; i < this.samples.length; i++) {
            this.samples[i].show();
        }
    }

	/**
	* Computes a cell index, based on x,y canvas coordinates
	*/
    this.xy2i = function(x,y) {

        return floor(x/this.cellSize) + floor(y / this.cellSize) * this.cols;

    }
	
	//Initialize the sampler just before it's construction ends
    this.init();
}


/**
* A hellper object representing a single sample
*/
function Sample(x,y) {
    this.x = x;
    this.y = y;


    this.show = function() {

        noStroke();
        fill(200);

        ellipse(this.x, this.y, 5,5);
    }
}
