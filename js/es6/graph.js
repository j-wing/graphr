import {Node} from "dist/node";
import {Edge} from "dist/edge";


var MAX_WEIGHT = 5;
var maxRandomEdgesPercent = .25
export class Graph {
    constructor(directed=true, allowNegativeEdges=false) {
        this.vertices = [];
        this.edges = new Map();
        this.directed = directed;

        this.startNode = null;
        this.rendered = false;

        this.allowNegativeEdges = allowNegativeEdges;

    }

    addVertex(value) {
        var node = new Node(value);
        this.vertices.push(node);
        this.edges.set(node, new Set());
    }

    removeVertex(value) {
  //   	index = this.vertices.indexOf(value)
  //   	if (index === -1) {
  //   		console.log("Tried removing vertex {0}, not in vertices".format(value))
  //   		return
  //   	}

		// index = this.vertices.indexOf(value)
		// this.vertices.splice(index, 1)

		// for (edge of edges) {
		// 	if (edge.has())
		// }
    }

    addEdge(fromNode, toNode, weight) {
        this.edges.get(fromNode).add(new Edge(fromNode, toNode, weight));
        if (!this.directed) {
            // Add the reverse edge
            this.edges.get(toNode).add(new Edge(toNode, fromNode, weight));
        }
    }

    removeEdge(edge) { }

    getVertex(v) {
    	return this.vertices[v]
    }

    hasEdge(u, v) { }

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
    numEdges() { }

    /* Sets up the position of the graph */
    setUpGraph() {
    	// Pick a random start node
        if (!this.startNode) {
            this.startNode = this.vertices[0];
        }

        this.startNode.coords = [App.canvasWidth / 2, App.canvasHeight / 2]

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
        if (this.rendered) {
        	// Render all edges first
        	for (var edge of this.getEdges()) {
        		edge.render(ctx)
        	}
        	for (var node of this.vertices) {
        		node.render(ctx)
        	}
        } else {
        	this.setUpGraph()
        }
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

    static randomGraph(numVertices=10, directed=true) {
        var graph = new Graph(directed);
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
