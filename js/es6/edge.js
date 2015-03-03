import {CanvasUtils} from "dist/canvas_utils"

export class Edge {
	/* Constructors */
	constructor(fromNode, toNode, weight) {
		this.fromNode = fromNode
		this.toNode = toNode
		this.weight = weight
		this.directed = true
	}

	/* Render methods */
	render(ctx) {
		var lineWidth = Math.abs(this.weight)
		lineWidth = 1 // for debugging purposes
		CanvasUtils.drawLine(ctx,
			this.fromNode.coords,
			this.toNode.coords,
			lineWidth,
			this.directed
		);
    }
}