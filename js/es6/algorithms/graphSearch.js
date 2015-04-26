import * as algos from "dist/algorithms/algorithmState";

export default class GraphSearchBase extends algos.AlgorithmState {
    constructor(graph) {
        super(graph);
        this.queue = [];
        this.seen = new Set();

        this.lastEdge = null;
        this.lastNode = null;
    }

    requiresStartNode() {
        return true;
    }

    addToQueue(node) {
        throw "NotImplemented: addToQueue";
    }

    popNextNode(){
        throw "NotImplemented: popNextNode";
    }

    setStartNode(node) {
        super(node);
        this.addToQueue(node);
    }

    next() {
        var current = null;
        // Get the next unseen node from the queue
        // Nodes may have been added to the queue and then visited. 
        do {
            current = this.popNextNode();
        }
        while (current && this.seen.has(current));

        if (!current) {
            this.isFinished = true;
            return;
        }

        this.seen.add(current);
        var edges = this.graph.getEdgesFrom(current);
        edges.reverse();

        for (var edge of edges) {
            if (!this.seen.has(edge.toNode)) {
                this.addToQueue(edge.toNode);
            }
        }

        this.graph.setSelectedNode(current);
        this.lastNode = current;

    }

    previous() {

    }
} 