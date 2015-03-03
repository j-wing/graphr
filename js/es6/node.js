import {CanvasUtils} from "dist/canvas_utils"

export class Node {
	/* Constructors */
    constructor(value, pos) {
        this.value = value;
        this.radius = 5 * this.value;
        this.pos = pos;
        this.x = null;
        this.y = null;
    }

    set coords(pair) {
        this.x = pair[0];
        this.y = pair[1];
    }

    get coords() {
    	return [this.x, this.y];
    }

    setAngle(a) {
    	this.angle = a
    }

    getAngle() {
    	return this.angle
    }

    /* Render methods */
    render(ctx) {
        if (!this.x || !this.y) {
        	// console.log("x and y for {0} are undefined".format(this))
            return;
        }

        // Then render the actual node
        // radius = this.value.toString()
        var radius = 25
        CanvasUtils.drawCircle(ctx, this.x, this.y, radius, "white");
        CanvasUtils.drawText(ctx, this.x, this.y, this.value.toString())

    }

    toString() {
        return this.value.toString();
    }
}


