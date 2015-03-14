import {CanvasUtils} from "dist/canvas_utils"

export class Node {
	/* Constructors */
    constructor(value, x=null, y=null) {
        this.value = value;
        this.radius = 25;
        this.x = x;
        this.y = y;

        this.clicked = false
    }

    set coords(pair) {
        this.x = pair[0];
        this.y = pair[1];
    }

    get coords() {
    	return [this.x, this.y];
    }

    get boundingRect() {
    	return [
    		this.x - this.radius,
    		this.y - this.radius,
    		this.x + this.radius,
    		this.y + this.radius
    	]
    }

    setAngle(a) {
    	this.angle = a
    }

    getAngle() {
    	return this.angle
    }

    setSelected(selected) {
      this.selected = selected;
      if (selected) {
        CanvasUtils.drawCircleOutline(this.ctx, this.x, this.y, this.radius+1, 3, "green")
      }
      else {
        CanvasUtils.drawCircleOutline(this.ctx, this.x, this.y, this.radius+1, 3, "lightblue")
      }
    }

   	/* Utility methods */

   	// Returns true if pos is in this node's bounds
   	posInBound(pos) {
   		var checkX = Math.abs(pos[0] - this.x) < this.radius
   		var checkY = Math.abs(pos[1] - this.y) < this.radius
   		return checkX && checkY
   	}

   	collidesWith(node) {
   		var xmin = node.x - node.radius;
   		var xmax = node.x + node.radius;
   		var ymin = node.y - node.radius;
   		var ymax = node.y + node.radius;
   		var checkX = this.x - this.radius >= xmax || xmin >= this.x + this.radius
   		var checkY = this.y - this.radius >= ymax || ymin >= this.y + this.radius
   		return !(checkX || checkY)
   	}

    /* Event Handlers */
    // NEEDS TO CHANGE
    handleClick() {
    	if (!this.clicked) {
    		CanvasUtils.drawCircleOutline(this.ctx, this.x, this.y, this.radius+1, 1, "rgb(69,140,191)")
    	} else {
    		CanvasUtils.drawCircleOutline(this.ctx, this.x, this.y, this.radius+2, 4, "lightblue")
    	}
    	this.clicked = !this.clicked
    }

    /* Render methods */
    render(ctx) {
        /* if x and y are undefined, don't render this node. */
        if (!this.x || !this.y) {
            return;
        }

        // Hacky solution
        this.ctx = ctx

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


