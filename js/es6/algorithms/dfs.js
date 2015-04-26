import GraphSearchBase from "dist/algorithms/graphSearch";

export default class DFSState extends GraphSearchBase {
    addToQueue(node) {
        this.queue.push(node);
    }

    popNextNode() {
        return this.queue.pop();
    }
} 