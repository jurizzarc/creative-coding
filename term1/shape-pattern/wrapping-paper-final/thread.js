class Thread {
    constructor(_i, _j) {
        this.i = _i;
        this.j = _j;
        this.cw = cellWidth;
        this.ch = cellHeight;
        this.ts = threadSize; 
    }

    // Draw grid and/or weave pattern on the canvas
    render() {
        push();
        let cellX = this.i * this.cw + this.cw / 2;
        let cellY = this.j * this.ch + this.ch / 2;
        // Replace point of origin to cellX, cellY
        translate(cellX, cellY);
        noFill();
        // Show grid lines if showGrid = true
        if (controller.showGrid) {
            stroke('#000');
            rect(0, 0, this.cw, this.ch);
        } else {
            noStroke();
        }
        // Draw weave patterns
        this.makeWeave('Plain', 2);
        this.makeWeave('Twill', 3);
        this.makeWeave('Satin', 4);
        pop();
    }

    // Create weave pattern 
    makeWeave(_type, _num) {
        // Index of the cell where the threads are drawn within
        let indexNum = this.i + this.j;
        // Display indexNum if showIndex = true
        if (controller.showIndex) {
            let cellContent = "" + indexNum;
            fill('#000');
            text(cellContent, 0, 0);
        }
        let threadPos = this.ts * 2; // Position of the thread in a cell
        let col1 = currentPalette[colorIndex[0]];
        let col2 = currentPalette[colorIndex[1]];
        let col3 = currentPalette[colorIndex[2]];
        let col4 = currentPalette[colorIndex[3]];
        // noStroke();

        // Apply blendMode if hasBlendMode = true
        if (controller.hasBlendMode) {
            blendMode(MULTIPLY);
        }

        if (weaveType == _type) {
            // Draw warp over weft
            if (indexNum % _num == 0) {
                // Weft Threads
                stroke(col1);
                fill(col1);
                rect(0, -this.ch/threadPos, this.cw, this.ch / this.ts);
                stroke(col2);
                fill(col2);
                rect(0, this.ch/threadPos, this.cw, this.ch / this.ts);
                // Warp Threads
                stroke(col3)
                fill(col3);
                rect(-this.cw/threadPos, 0, this.cw / this.ts, this.ch);
                stroke(col4);
                fill(col4);
                rect(this.cw/threadPos, 0, this.cw / this.ts, this.ch);
            // Draw weft over warp
            } else {
                // Warp Threads
                stroke(col3)
                fill(col3);
                rect(-this.cw/threadPos, 0, this.cw / this.ts, this.ch);
                stroke(col4);
                fill(col4);
                rect(this.cw/threadPos, 0, this.cw / this.ts, this.ch);
                // Weft Threads
                stroke(col1);
                fill(col1);
                rect(0, -this.ch/threadPos, this.cw, this.ch / this.ts);
                stroke(col2);
                fill(col2);
                rect(0, this.ch/threadPos, this.cw, this.ch / this.ts);
            }
        }
    }
}