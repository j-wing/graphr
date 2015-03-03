export class Node {
	/* Constructors */
    constructor(value, pos) {
        this.value = value;
        this.radius = 20 * this.value * .5;
        this.pos = pos;
        this.x = null;
        this.y = null;
    }

    set coords(pair) {
        this.x = pair[0];
        this.y = pair[1]
    }

    /* Render methods */
    render(ctx) {
        if (!this.x || !this.y) {
            return;
        }

        ctx.font = "20px Helvetica";
        ctx.fillStyle = "black";
        ctx.textAlign = "center"; 
        ctx.fillText(this.value.toString(), this.x, this.y);

        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.stroke();

    }

    toString() {
        return this.value.toString();
    }
}


