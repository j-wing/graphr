define(["exports", "dist/node", "dist/edge", "dist/algorithms/algorithms"], function (exports, _distNode, _distEdge, _distAlgorithmsAlgorithms) {
  "use strict";

  var Node = _distNode.Node;
  var Edge = _distEdge.Edge;
  var algos = _distAlgorithmsAlgorithms;


  var MAX_WEIGHT = 5;
  var maxRandomEdgesPercent = 0.25;
  var Graph = (function () {
    var Graph = function Graph(ctx, bounds, directed, allowNegativeEdges) {
      if (directed === undefined) directed = true;
      if (allowNegativeEdges === undefined) allowNegativeEdges = false;
      window.graph = this;
      this.ctx = ctx;
      this.vertices = [];
      this.edges = new Map();
      this.directed = directed;

      this.startNode = null;
      this.rendered = false;

      // Disables graph modification during algorithm execution
      this.executingAlgorithm = false;
      this.selectedNode = null;
      this.selectedEdge = null;

      this.allowNegativeEdges = allowNegativeEdges;

      this.bounds = {
        w: bounds[0],
        h: bounds[1]
      };

      this.render(this.ctx);

      this.eventHandler = null;
    };

    Graph.prototype.addVertex = function (value, x, y) {
      if (x === undefined) x = null;
      if (y === undefined) y = null;
      this.addNode(new Node(value, x, y));
    };

    Graph.prototype.addNode = function (node) {
      if (this.executingAlgorithm) {
        return;
      }
      this.vertices.push(node);
      this.edges.set(node, new Set());
      if (node.x != null && node.y != null) {
        this.render(this.ctx);
      }


      this.eventHandler.addInteractable(node);
    };

    Graph.prototype.removeVertex = function (value) {};

    Graph.prototype.addEdge = function (fromNode, toNode, weight) {
      if (this.executingAlgorithm) {
        return;
      }

      var newEdge = new Edge(fromNode, toNode, weight);
      if (this.hasEdge(fromNode, toNode)) {
        var edge = this.getEdge(fromNode, toNode);
        edge.weight = weight;
        return;
      }
      this.edges.get(fromNode).add(new Edge(fromNode, toNode, weight));
      if (!this.directed) {
        // Add the reverse edge
        this.edges.get(toNode).add(new Edge(toNode, fromNode, weight));
      }
      this.render(this.ctx);
      console.log(this.numEdges());
    };

    Graph.prototype.removeEdge = function (edge) {};

    Graph.prototype.getVertex = function (v) {
      return this.vertices[v];
    };

    Graph.prototype.hasEdge = function (u, v) {
      var edgesFromU = this.edges.get(u);
      for (var _iterator = edgesFromU[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        var edge = _step.value;
        if (edge.toNode === v) return true;
      }

      return false;
    };

    Graph.prototype.getEdge = function (u, v) {
      var edgesFromU = this.edges.get(u);
      for (var _iterator2 = edgesFromU[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
        var edge = _step2.value;
        if (edge.toNode === v) return edge;
      }

      return false;
    };

    Graph.prototype.getEdgesFrom = function (v) {
      var edges = this.edges.get(v).entries();
      var edgesList = [];
      for (var _iterator3 = edges[Symbol.iterator](), _step3; !(_step3 = _iterator3.next()).done;) {
        var edge = _step3.value;
        edgesList.push(edge[0]);
      }

      return edgesList;
    };

    Graph.prototype.getEdges = function () {
      var edges = [];
      for (var _iterator4 = this.vertices[Symbol.iterator](), _step4; !(_step4 = _iterator4.next()).done;) {
        var v = _step4.value;
        edges = edges.concat(this.getEdgesFrom(v));
      }

      return edges;
    };

    Graph.prototype.numVertices = function () {
      return this.vertices.length;
    };

    Graph.prototype.numEdges = function () {
      return this.getEdges().length;
    };

    Graph.prototype.beginAlgorithm = function (name) {
      /*
          @params: string name
          @returns: AlgorithmState object, 
                      or null if no registered algorithm with `name` exists
      */

      if (this.algorithmExecuting) {
        this.algorithmExecuting.cancel();
      }

      var stateCls = algos.ALGORITHM_STATES[name];
      if (!stateCls) {
        return null;
      }

      var state = new stateCls(this);
      if (state.requiresStartNode()) {
        this.chooseStartNode(state);
      }
      if (state.requiresEndNode()) {
        this.chooseEndNode(state);
      }

      this.executingAlgorithm = state;
      return state;
    };

    Graph.prototype.chooseStartNode = function (state) {
      console.error("Implement a way to choose a start node!");
      state.setStartNode(this.vertices[0]);
    };

    Graph.prototype.chooseEndNode = function (state) {
      console.error("Implement a way to choose an end node!");
      state.setEndNode(this.vertices.slice(-1)[0]);
    };

    Graph.prototype.setSelectedNode = function (node) {
      if (this.selectedNode) {
        this.selectedNode.setSelected(false);
      }
      this.selectedNode = node;
      this.selectedNode.setSelected(true);
    };

    Graph.prototype.setSelectedEdge = function (edge) {
      if (this.selectedEdge) {
        this.selectedEdge.setSelected(false);
      }
      this.selectedEdge = edge;
      this.selectedEdge.setSelected(true);
    };

    Graph.prototype.setUpGraph = function () {
      // Pick a random start node
      if (!this.startNode) {
        this.startNode = this.vertices[0];
      }

      this.startNode.coords = [this.bounds.w / 2, this.bounds.h / 2];

      this.startNode.setAngle(0);
      // this.startNode.render(ctx)
      var queue = [this.startNode];
      var visited = new Set();

      // Let DIST be the distance new nodes should be drawn
      var DIST = 100;

      // If not rendered, render the graph
      while (queue.length != 0) {
        var currNode = queue.shift();
        visited.add(currNode);

        var edgesFrom = this.getEdgesFrom(currNode);
        for (var _iterator5 = edgesFrom[Symbol.iterator](), _step5; !(_step5 = _iterator5.next()).done;) {
          var edge = _step5.value;
          if (visited.has(edge.toNode)) {
            continue;
          }

          queue.push(edge.toNode);
          // Set the edge coords to be distance DIST away,
          // at a random angle b/w 0 and 2PI
          // NEW: constrain angle based on (Message Eric if confused)
          var startAngle = currNode.getAngle() - (Math.PI / 2);
          var angle = startAngle + Math.random() * (Math.PI);
          if (currNode === this.startNode) {
            // we want edges from the first node to branch out all over
            angle = Math.random() * (2 * Math.PI);
          }
          edge.toNode.coords = [currNode.x + DIST * Math.cos(angle), currNode.y + DIST * Math.sin(angle)];
          // TODO: check that toNode's coords don't overlap with prev coords
          edge.toNode.setAngle(angle);
        }
      }

      this.rendered = true;
    };

    Graph.prototype.render = function (ctx) {
      // if (this.rendered) {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.ctx.fillStyle = "lightblue";
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      for (var _iterator6 = this.getEdges()[Symbol.iterator](), _step6; !(_step6 = _iterator6.next()).done;) {
        var edge = _step6.value;
        edge.render(ctx);
      }

      ctx.stroke();
      for (var _iterator7 = this.vertices[Symbol.iterator](), _step7; !(_step7 = _iterator7.next()).done;) {
        var node = _step7.value;
        // console.log(this.vertices.length)
        node.render(ctx);
      }
    };

    Graph.simpleGraph = function (numVertices, directed, defaultValue) {
      if (numVertices === undefined) numVertices = 2;
      if (directed === undefined) directed = true;
      if (defaultValue === undefined) defaultValue = 5;
      var graph = new Graph(directed);
      for (var i = 0; i < numVertices; i++) {
        graph.addVertex(defaultValue);
        if (i != 0) {
          graph.addEdge(graph.vertices[i - 1], graph.vertices[i], 1);
        }
      }
      return graph;
    };

    Graph.randomGraph = function (ctx, numVertices, directed) {
      if (numVertices === undefined) numVertices = 10;
      if (directed === undefined) directed = true;
      var graph = new Graph(ctx, directed);
      for (var i = 1; i <= numVertices; i++) {
        graph.addVertex(i);
      }

      for (var i = 0; i < numVertices; i++) {
        // Pick a random node to connect to
        for (var edgeCount = 0; edgeCount < _.random(Math.ceil(maxRandomEdgesPercent * numVertices)); edgeCount++) {
          var other = _.sample(graph.vertices);
          if (other == graph.vertices[i]) {
            continue;
          }

          // Assign a random weight
          var weight;
          if (graph.allowNegativeEdges) {
            weight = _.random(-MAX_WEIGHT, MAX_WEIGHT + 1);
          } else {
            weight = _.random(MAX_WEIGHT + 1);
          }
          graph.addEdge(graph.vertices[i], other, weight);
        }
      }
      return graph;
    };

    return Graph;
  })();

  exports.Graph = Graph;
});