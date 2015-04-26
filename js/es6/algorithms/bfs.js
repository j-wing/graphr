import GraphSearchBase from "dist/algorithms/graphSearch";

export default class BFSState extends GraphSearchBase {
    addToQueue(node) {
        this.queue.push(node);
    }

    popNextNode() {
        return this.queue.shift();
    }

}
