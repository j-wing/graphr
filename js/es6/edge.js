export class Edge {
	/* Constructors */
	constructor(fromNode, toNode, weight) {
		this.fromNode = fromNode
		this.toNode = toNode
		this.weight = weight
	}

	/* Render methods */
	render(ctx) {
        // ctx.beginPath();
        // var lineAngle = Math.atan(Math.abs((this.toNode.y - this.fromNode.y) / (this.toNode.x - this.toNode.y)));
        // var lineOffsetX = this.fromNode.radius * Math.cos(lineAngle);
        // var lineOffsetY = this.fromNode.radius * Math.sin(lineAngle);
        // ctx.moveTo(this.fromNode.x + lineOffsetX, this.fromNode.y + lineOffsetY);
        // ctx.lineTo(this.toNode.x - lineOffsetX, this.toNode.y - lineOffsetY);

        // ctx.strokeStyle = "black";
        // ctx.stroke();
    }
}