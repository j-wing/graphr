import {Node} from "dist/node"
import {Edge} from "dist/edge"
import {Graph} from "dist/graph"
import {EventHandler} from "dist/event_handler"

class UserOptions {
    /* Class that manages options that the user can toggle. */

    constructor() {
        this._options = {
            "GRAPH_DIRECTED":true,
        }
    }

    get options() {
        return this._options;
    }

    setOption(option, value) {
        this._options[option] = value;
    }
}

class GraphrApp {
    constructor() {
        this.canvas = $("canvas");
        this.ctx = this.canvas[0].getContext("2d");
        this.ctx.translate(0.5, 0.5)
        this.setCanvasSize();
        this.options = new UserOptions();

        var bounds = [
        	this.canvasWidth,
        	this.canvasHeight
        ]

        this.graph = new Graph(this.ctx, bounds, true);
    }

    run() {
        // window.requestAnimationFrame(() =>
        //     this.renderLoop()
        // );
		this.render()
    }

    setCanvasSize() {
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.canvas.attr("height", this.canvasHeight).attr("width", this.canvasWidth);
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.fillStyle = "lightblue";
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        // this.graph.render(this.ctx);

        // window.requestAnimationFrame(() =>
        //     this.renderLoop()
        // );
    }

    collidesWithAny(otherNode) {
    	// Takes O(|v|) time every time we add a new vertex

    	for (var node of this.graph.vertices) {
    		if (node.collidesWith(otherNode)) {
    			return true
    		}
    	}

    	return false
    }
}

$(document).ready(function() {

    window.App = new GraphrApp();
    var graph = App.graph

	// Setup event handler
	var latencies = {
		'longpress': 300
	}
	var eh = new EventHandler("#canvas", latencies)
	graph.eventHandler = eh
	var nextNodeValue = 1

    var canvas = document.getElementById("canvas")

	// register handlers
	canvas.addEventListener('mousedown', e =>
		eh.mousedownHandler(e)
	)
	canvas.addEventListener('mouseup', e =>
		eh.mouseupHandler(e)
	)

	// register custom handlers
	canvas.addEventListener('longpress', function() {
		var newNode = new Node(nextNodeValue, eh.mousePosX, eh.mousePosY)
		if (!App.collidesWithAny(newNode)) {
			graph.addNode(newNode)
			nextNodeValue += 1
			console.log("Success!")
		}
	}, false)

	canvas.addEventListener('edgecreated', e => {
		var fromNode = e.detail.start
		var toNode = e.detail.end
		graph.addEdge(fromNode, toNode, 1)
		// console.log("edge created")
	})

    // console.log(graph.getEdgesFrom(graph.getVertex(0)))


    App.run();
})