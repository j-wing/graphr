import {Node} from "dist/node";
import {Edge} from "dist/edge";
import * as algos from "dist/algorithms/algorithms";

var MAX_WEIGHT = 5;
var maxRandomEdgesPercent = .25
export class Graph {
    constructor(ctx, bounds, directed=true, allowNegativeEdges=false) {
        window.graph = this;
    	this.ctx = ctx
        this.vertices = [];
        this.edges = new Map();
        this.directed = directed;

        this.startNode = null;
        this.rendered = false;

        // Disables graph modification during algorithm execution
        this.executingAlgorithm = false;
        this.selectedNode = null;
        this.selectedEdge = null;

        this.allowNegativeEdges = allowNegativeEdges;

        this.bounds = {
        	w: bounds[0],
        	h: bounds[1]
        }

        this.render(this.ctx)

        this.eventHandler = null
    }

    algorithmFinished() {
        /* Called by algorithm when it finishes executing its last step. */
        this.executingAlgorithm = null; 
        this.setSelectedNode(null);
    }

    addVertex(value, x=null, y=null) {
        this.addNode(new Node(value, x, y));
    }

    addNode(node) {
        if (this.executingAlgorithm) {
            return;
        }
    	this.vertices.push(node)
    	this.edges.set(node, new Set())
    	if (node.x != null && node.y != null) {
        	this.render(this.ctx)
        }


        this.eventHandler.addInteractable(node)
    }

    removeVertex(value) {
    }

    addEdge(fromNode, toNode, weight) {
        if (this.executingAlgorithm) {
            return;
        }

    	var newEdge = new Edge(fromNode, toNode, weight)
    	if (this.hasEdge(fromNode, toNode)) {
    		var edge = this.getEdge(fromNode, toNode)
    		edge.weight = weight
    		return
    	}
        this.edges.get(fromNode).add(new Edge(fromNode, toNode, weight));
        if (!this.directed) {
            // Add the reverse edge
            this.edges.get(toNode).add(new Edge(toNode, fromNode, weight));
        }
        this.render(this.ctx)
        console.log(this.numEdges())
    }

    removeEdge(edge) { }

    getVertex(v) {
    	return this.vertices[v]
    }

    hasEdge(u, v) {
    	var edgesFromU = this.edges.get(u)
    	for (var edge of edgesFromU) {
    		if (edge.toNode === v)
    			return true
    	}
    	return false
    }

    getEdge(u, v) {
    	var edgesFromU = this.edges.get(u)
    	for (var edge of edgesFromU) {
    		if (edge.toNode === v)
    			return edge
    	}
    	return false
    }

    /* Returns the outgoing edges from a vertex v */
    getEdgesFrom(v) {
    	var edges = this.edges.get(v).entries()
    	var edgesList = []
    	for (var edge of edges) {
    		edgesList.push(edge[0])
    	}
    	return edgesList
    }

    /* Returns the edges as a list */
    getEdges() {
    	var edges = []
    	for (var v of this.vertices) {
    		edges = edges.concat(this.getEdgesFrom(v))
    	}
    	return edges
    }

    /* Returns the number of vertices */
    numVertices() {
    	return this.vertices.length
    }

    /* Returns the number of edges */
    numEdges() {
    	return this.getEdges().length
    }

    beginAlgorithm(name) {
        /*
            @params: string name
            @returns: AlgorithmState object, 
                        or null if no registered algorithm with `name` exists
        */

        if (this.algorithmExecuting) {
            this.algorithmExecuting.cancel();
        }

        var stateCls = algos.ALGORITHM_STATES[name];
        if (!stateCls) {
            return null;
        }

        var state = new stateCls(this);
        if (state.requiresStartNode()) {
            this.chooseStartNode(state);
        }
        if (state.requiresEndNode()) {
            this.chooseEndNode(state);
        }

        this.executingAlgorithm = state;
        return state;
    }

    chooseStartNode(state) {
        console.error("Implement a way to choose a start node!");
        state.setStartNode(this.vertices[0]);
    }

    chooseEndNode(state) {
        console.error("Implement a way to choose an end node!");
        state.setEndNode(this.vertices.slice(-1)[0]);
    }

    setSelectedNode(node) {
        if (this.selectedNode) {
            this.selectedNode.setSelected(false);
        }
        this.selectedNode = node;

        if (node) {
            this.selectedNode.setSelected(true);
        }
    }

    setSelectedEdge(edge) {
        if (this.selectedEdge) {
            this.selectedEdge.setSelected(false);
        }
        this.selectedEdge = edge;
        this.selectedEdge.setSelected(true);
    }

    /* Sets up the position of the graph */
    setUpGraph() {
    	// Pick a random start node
        if (!this.startNode) {
            this.startNode = this.vertices[0];
        }

        this.startNode.coords = [this.bounds.w / 2, this.bounds.h / 2]

        this.startNode.setAngle(0)
        // this.startNode.render(ctx)
        var queue = [this.startNode]
        var visited = new Set()

        // Let DIST be the distance new nodes should be drawn
        let DIST = 100

        // If not rendered, render the graph
        while (queue.length != 0) {
        	var currNode = queue.shift()
        	visited.add(currNode)

        	var edgesFrom = this.getEdgesFrom(currNode)
        	for (var edge of edgesFrom) {
        		if (visited.has(edge.toNode)) {
        			continue
        		}

        		queue.push(edge.toNode)
        		// Set the edge coords to be distance DIST away,
        		// at a random angle b/w 0 and 2PI
        		// NEW: constrain angle based on (Message Eric if confused)
        		var startAngle = currNode.getAngle() - (Math.PI / 2)
        		var angle = startAngle + Math.random() * (Math.PI)
        		if (currNode === this.startNode) {
        			// we want edges from the first node to branch out all over
        			angle = Math.random() * (2*Math.PI)
        		}
        		edge.toNode.coords = [
        			currNode.x + DIST * Math.cos(angle),
        			currNode.y + DIST * Math.sin(angle)
        		]
        		// TODO: check that toNode's coords don't overlap with prev coords
        		edge.toNode.setAngle(angle)
        	}
        }

        this.rendered = true;
    }

    /* TODO: Need to handle updating the graph when a new node/edge is added */
    render(ctx) {
        // if (this.rendered) {

        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.fillStyle = "lightblue";
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    	// Render all edges first
    	for (var edge of this.getEdges()) {
    		edge.render(ctx);
    	}
        ctx.stroke();
    	for (var node of this.vertices) {
    		// console.log(this.vertices.length)
    		node.render(ctx);
    	}
        //} else {
        //	this.setUpGraph()
        //}
    }



    static simpleGraph(numVertices=2, directed=true, defaultValue=5) {
        var graph = new Graph(directed);
        for (var i=0; i < numVertices;i++) {
            graph.addVertex(defaultValue);
            if (i != 0) {
                graph.addEdge(graph.vertices[i-1], graph.vertices[i], 1);
            }
        }
        return graph;
    }

    static randomGraph(ctx, numVertices=10, directed=true) {
        var graph = new Graph(ctx, directed);
        for (var i = 1; i <= numVertices; i++) {
            graph.addVertex(i);
        }

        for (var i = 0; i < numVertices; i++) {
            // Pick a random node to connect to
            for (var edgeCount=0;edgeCount < _.random(Math.ceil(maxRandomEdgesPercent*numVertices)); edgeCount++) {
                var other = _.sample(graph.vertices);
                if (other == graph.vertices[i]) {
                    continue;
                }

                // Assign a random weight
                var weight;
                if (graph.allowNegativeEdges) {
                    weight = _.random(-MAX_WEIGHT, MAX_WEIGHT+1);
                }
                else {
                    weight = _.random(MAX_WEIGHT+1);
                }
                graph.addEdge(graph.vertices[i], other, weight);
            }
        }
        return graph;
    }
}
