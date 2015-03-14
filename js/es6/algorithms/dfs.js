import * as algos from "dist/algorithms/algorithmState";

export class DFSState extends algos.AlgorithmState {
    constructor(graph) {
        super(graph);
        this.stack = [];
        this.seen = new Set();

        this.lastEdge = null;
        this.lastNode = null;
    }

    requiresStartNode() {
        return true;
    }

    setStartNode(node) {
        super(node);
        this.stack.push(node);
    }

    next() {

        var current = null;
        do {
            current = this.stack.pop();
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
                this.stack.push(edge.toNode);
            }
        }

        this.graph.setSelectedNode(current);
        this.lastNode = current;

    }

    previous() {

    }
} 