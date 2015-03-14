export class AlgorithmState {
    constructor(graph) {
        this.graph = graph;
        this.isFinished = false;
        this.startNode = null;
    }

    requiresStartNode() {
        /*
            Abstract method;
            returns true if this state requires a start node to begin.
        */
        throw "NotImplementedError";
    }

    setStartNode(node) {
        /*
            Abstract method;
        */
        this.startNode = node;
    }


    next() {
        /*
            Abstract method for advancing the state of the algorithm.
        */
        throw "NotImplementedError";
    }

    previous() {
        throw "NotImplementedError";
    }
}