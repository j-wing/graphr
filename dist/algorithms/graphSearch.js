define(["exports", "dist/algorithms/algorithmState"], function (exports, _distAlgorithmsAlgorithmState) {
  "use strict";

  var _extends = function (child, parent) {
    child.prototype = Object.create(parent.prototype, {
      constructor: {
        value: child,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    child.__proto__ = parent;
  };

  var algos = _distAlgorithmsAlgorithmState;
  var GraphSearchBase = (function (algos) {
    var GraphSearchBase = function GraphSearchBase(graph) {
      algos.AlgorithmState.call(this, graph);
      this.queue = [];
      this.seen = new Set();

      this.lastEdge = null;
      this.lastNode = null;
    };

    _extends(GraphSearchBase, algos.AlgorithmState);

    GraphSearchBase.prototype.requiresStartNode = function () {
      return true;
    };

    GraphSearchBase.prototype.addToQueue = function (node) {
      throw "NotImplemented: addToQueue";
    };

    GraphSearchBase.prototype.popNextNode = function () {
      throw "NotImplemented: popNextNode";
    };

    GraphSearchBase.prototype.setStartNode = function (node) {
      algos.AlgorithmState.prototype.setStartNode.call(this, node);
      this.addToQueue(node);
    };

    GraphSearchBase.prototype.next = function () {
      var current = null;
      // Get the next unseen node from the queue
      // Nodes may have been added to the queue and then visited.
      do {
        current = this.popNextNode();
      } while (current && this.seen.has(current));

      if (!current) {
        this.isFinished = true;
        return;
      }

      this.seen.add(current);
      var edges = this.graph.getEdgesFrom(current);
      edges.reverse();

      for (var _iterator = edges[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        var edge = _step.value;
        if (!this.seen.has(edge.toNode)) {
          this.addToQueue(edge.toNode);
        }
      }

      this.graph.setSelectedNode(current);
      this.lastNode = current;
    };

    GraphSearchBase.prototype.previous = function () {};

    return GraphSearchBase;
  })(algos);

  exports["default"] = GraphSearchBase;
});