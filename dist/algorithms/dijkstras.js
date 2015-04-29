define(["exports", "dist/algorithms/algorithmState", "dist/infobox", "js/heapq"], function (exports, _distAlgorithmsAlgorithmState, _distInfobox, _jsHeapq) {
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
  var DijkstraInfobox = _distInfobox.DijkstraInfobox;
  var heapq = _jsHeapq;
  var DijkstraState = (function (algos) {
    var DijkstraState = function DijkstraState(graph) {
      algos.AlgorithmState.call(this, graph);
      this.queue = graph.vertices.slice();
      this.dist = new Map();
      this.infobox = new DijkstraInfobox(this);

      for (var _iterator = graph.vertices[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        var v = _step.value;
        this.dist[v] = Infinity;
      }

      this.lastEdge = null;
      this.lastNode = null;
    };

    _extends(DijkstraState, algos.AlgorithmState);

    DijkstraState.prototype.requiresStartNode = function () {
      return true;
    };

    DijkstraState.prototype.requiresEndNode = function () {
      return true;
    };

    DijkstraState.prototype.setStartNode = function (node) {
      algos.AlgorithmState.prototype.setStartNode.call(this, node);
      this.dist[node] = 0;
      heapq.heapify(this.queue, this.heapCmp.bind(this));
      this.infobox.update();
    };

    DijkstraState.prototype.heapCmp = function (a, b) {
      if (this.dist[a] > this.dist[b]) {
        return 1;
      } else if (this.dist[a] == this.dist[b]) {
        return 0;
      } else {
        return -1;
      }
    };

    DijkstraState.prototype.next = function () {
      if (this.queue.length == 0) {
        this.isFinished = true;
        this.infobox.update();
        return;
      }

      var current = heapq.pop(this.queue, this.heapCmp.bind(this));
      this.graph.setSelectedNode(current);

      var edges = this.graph.getEdgesFrom(current);
      edges.reverse();

      for (var _iterator2 = edges[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
        var edge = _step2.value;
        if (this.dist[edge.toNode] > this.dist[current] + edge.weight) {
          this.dist[edge.toNode] = this.dist[current] + edge.weight;
          this.infobox.update();
        }
      }

      heapq.heapify(this.queue, this.heapCmp.bind(this));
    };

    DijkstraState.prototype.previous = function () {};

    return DijkstraState;
  })(algos);

  exports["default"] = DijkstraState;
});