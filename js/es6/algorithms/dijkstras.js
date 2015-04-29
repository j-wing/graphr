import * as algos from "dist/algorithms/algorithmState";
import {DijkstraInfobox} from "dist/infobox";
import * as heapq from "js/heapq";

export default class DijkstraState extends algos.AlgorithmState {
    constructor(graph) {
        super(graph);
        this.queue = graph.vertices.slice();
        this.dist = new Map();
        this.infobox = new DijkstraInfobox(this);

        for (let v of graph.vertices) {
            this.dist[v] = Infinity;
        }

        this.lastEdge = null;
        this.lastNode = null;
    }

    requiresStartNode() {
        return true;
    }

    requiresEndNode() {
        return true;
    }

    setStartNode(node) {
        super(node);
        this.dist[node] = 0;
        heapq.heapify(this.queue, this.heapCmp.bind(this));
        this.infobox.update();
    }

    heapCmp(a, b) {
        if (this.dist[a] > this.dist[b]) {
            return 1
        }
        else if (this.dist[a] == this.dist[b]) {
            return 0;
        }
        else {
            return -1;
        }
    }


    next() {
        if (this.queue.length == 0) {
            this.isFinished = true;
            this.infobox.update();
            return;
        }

        var current = heapq.pop(this.queue, this.heapCmp.bind(this));
        this.graph.setSelectedNode(current);
        
        var edges = this.graph.getEdgesFrom(current);
        edges.reverse();

        for (var edge of edges) {
            if (this.dist[edge.toNode] > this.dist[current] + edge.weight) {
                this.dist[edge.toNode] = this.dist[current] + edge.weight;
            this.infobox.update();
            }
        }
        heapq.heapify(this.queue, this.heapCmp.bind(this));
    }

    previous() {

    }
} 