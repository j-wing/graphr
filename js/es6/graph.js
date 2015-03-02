import {Node} from "dist/node";
import {Edge} from "dist/edge";

var MAX_WEIGHT = 100;
export class Graph {
    constructor(directed=true) {
        this.vertices = [];
        this.edges = new Map();
        this.directed = true;

        this.startNode = null;
    }

    addVertex(value) {
        var node = new Node(value);
        this.vertices.push(node);
        this.edges.set(node, new Set());
    }

    addEdge(fromNode, toNode, weight) {
        this.edges.get(fromNode).add(new Edge(fromNode, toNode, weight));
        if (!this.directed) {
            // Add the reverse edge
            this.edges.get(toNode).add(new Edge(toNode, fromNode, weight));
        }
    }

    render(ctx) {
        // Pick a random start node
        if (!this.startNode) {
            this.startNode = _.sample(this.vertices);
        }

        this.startNode.render(ctx, App.canvasWidth / 2, App.canvasHeight / 2);
        var queue = [];
        var current;
        // while (queue.length != 0) {
        //     current = queue.shift();
        //     current.render
        // }

    }

    static randomGraph(numVertices=10, directed=true) {
        var graph = new Graph();
        for (var i = 1; i <= numVertices; i++) {
            graph.addVertex(i);
        }

        for (var i = 0; i < numVertices; i++) {
            // Pick a random node to connect to
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
        return graph;
    }
}
