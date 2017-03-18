function Grid(cellSize) {
    this.cells = [];
    this.cellSize = cellSize;

    this.cols = ceil(width / this.cellSize);
    this.rows = ceil(height / this.cellSize);

    for (var i = 0; i < this.rows*this.cols; i++) {
        this.cells.push({
            count: 0
        })
    }


    this.xy2i = function(x,y) {
        return floor(x / this.cellSize) + this.cols * floor(y / this.cellSize);
    }

    this.show = function() {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {

                var index =  j + i * this.cols;
                if (this.cells[index].count > 0) {
                    fill(200,0,0,80);
                } else {
                    fill(200,200,200,80);
                }

                rect(j*this.cellSize, i*this.cellSize, this.cellSize, this.cellSize)
            }
        }
    }

    this.move = function(index, from, to) {
        var prevCell = this.xy2i(from.x, from.y);
        var currentCell = this.xy2i(to.x, to.y);

        delete this.cells[prevCell][index];

        this.cells[prevCell].count --;
        this.cells[prevCell].count = max(this.cells[prevCell].count, 0);

        this.cells[currentCell][index] = true;
        this.cells[currentCell].count ++;
    }

    this.findNeighbors = function(pos, birds) {

        var cellIndex = this.xy2i(pos.x, pos.y);

        var indexes = [
            cellIndex - 1 - this.cols, cellIndex - this.cols, cellIndex + 1 - this.cols,
            cellIndex - 1, cellIndex, cellIndex + 1,
            cellIndex - 1 + this.cols, cellIndex + this.cols, cellIndex + 1 + this.cols,
        ];

        var neighbors = [];

        for (var i = 0; i < indexes.length; i++) {
            var ci = indexes[i];

            if (ci < 0 || ci >= this.cells.length) {
                continue;
            }

            var cell = this.cells[ci];
            if(cell.count > 0 ) {
                for (var prop in cell) {
                    if (cell.hasOwnProperty(prop) && prop !='count') {
                        neighbors.push(birds[prop])
                    }
                }

            }
        }

        return neighbors;

    }

}
