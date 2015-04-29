export class AlgorithmState {
    constructor(graph) {
        this.graph = graph;
        this.isFinished = false;
        this.startNode = null;
        this.endNode = null;
        this.autoStepInterval = 0;
        this.autoStepTimer = null;
    }

    cancel() {
        if (this.autoStepTimer) {
            clearTimeout(this.autoStepTimer);
        }
    }

    requiresStartNode() {
        /*
            Abstract method;
            returns true if this state requires a start node to begin.
            Defaults to false.
        */
        return false;
    }

    requiresEndNode() {
        /*
            Abstract method;
            returns true if this state requires an end node.
            Also defaults to false.
        */
        return false;
    }

    setStartNode(node) {
        /*
            Abstract method;
        */
        this.startNode = node;
    }

    setEndNode(node) {
        this.endNode = node;
    }

    autoStep() {
        if (!this.isFinished) {
            this.next();
            this.autoStepTimer = setTimeout(this.autoStep.bind(this), this.autoStepInterval);
        }

        else {
            this.graph.algorithmFinished();
        }

    }

    setAutoStepInterval(interval) {
        /*
            Sets the interval at which the algorithm automatically calls .next().
            Set to 0 to disable auto-stepping.

            TODO: determine whether this should call autoStep immediately, or after a delay of `interval`
        */
        this.autoStepInterval = interval;
        if (interval !== 0) {
            this.autoStepTimer = setTimeout(this.autoStep.bind(this), this.autoStepInterval);
        }
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