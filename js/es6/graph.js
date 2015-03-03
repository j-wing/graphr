import {Node} from "dist/node";
import {Edge} from "dist/edge";

var MAX_WEIGHT = 100;
var maxRandomEdgesPercent = .6
export class Graph {
    constructor(directed=true) {
        this.vertices = [];
        this.edges = new Map();
        this.directed = true;

        this.startNode = null;
        this.rendered = false;
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

        if (this.rendered) {
            for (let [vertex, edges] of this.edges) {
                vertex.render(ctx);
                for (let edge of edges) {
                    edge.render(ctx);
                }
            }
            return;
        }

        if (!this.startNode) {
            this.startNode = this.vertices[0];//_.sample(this.vertices);
        }

        this.startNode.coords = [App.canvasWidth / 2, App.canvasHeight / 2];
        this.startNode.render(ctx);
        var queue = [for (edge of this.edges.get(this.startNode)) edge]
        var currentEdge;
        var visited = new Set();

        while (queue.length != 0) {
            currentEdge = queue.shift();
            currentEdge.toNode.coords = [
                                        _.random(currentEdge.toNode.radius, App.canvasWidth - currentEdge.toNode.radius),
                                        _.random(currentEdge.toNode.radius, App.canvasHeight - currentEdge.toNode.radius)];
            currentEdge.toNode.render(ctx);

            currentEdge.render(ctx);

            // for (var edge of this.edges.get(currentEdge.toNode)) {
            //     if (!visited.has(edge)) {
            //         queue.push(edge);
            //         visited.add(edge);
            //     }
            // }
        }

        this.rendered = true;

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
