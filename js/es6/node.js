export class Node {
	/* Constructors */
    constructor(value, pos) {
        this.value = value;
        this.radius = 20 * this.value * .5;
        this.pos = pos;
    }

    /* Render methods */
    render(ctx, x, y) {
        ctx.font = "20px Helvetica";
        ctx.fillStyle = "black";
        ctx.textAlign = "center"; 
        ctx.fillText(this.value.toString(), x, y);

        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, 2*Math.PI);
        ctx.stroke();

    }
}


