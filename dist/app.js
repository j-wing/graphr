define(["exports", "dist/node", "dist/edge", "dist/graph", "dist/event_handler", "dist/sidebar"], function (exports, _distNode, _distEdge, _distGraph, _distEventHandler, _distSidebar) {
  "use strict";

  var _classProps = function (child, staticProps, instanceProps) {
    if (staticProps) Object.defineProperties(child, staticProps);
    if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
  };

  var Node = _distNode.Node;
  var Edge = _distEdge.Edge;
  var Graph = _distGraph.Graph;
  var EventHandler = _distEventHandler.EventHandler;
  var Sidebar = _distSidebar.Sidebar;
  var UserOptions = (function () {
    var UserOptions =
    /* Class that manages options that the user can toggle. */

    function UserOptions() {
      this._options = {
        GRAPH_DIRECTED: true };
    };

    UserOptions.prototype.setOption = function (option, value) {
      this._options[option] = value;
    };

    _classProps(UserOptions, null, {
      options: {
        get: function () {
          return this._options;
        }
      }
    });

    return UserOptions;
  })();

  var GraphrApp = (function () {
    var GraphrApp = function GraphrApp() {
      this.canvas = $("canvas");
      this.ctx = this.canvas[0].getContext("2d");
      this.ctx.translate(0.5, 0.5);
      this.setCanvasSize();
      this.options = new UserOptions();
      this.sidebar = new Sidebar();
      this.sidebar.getAlgorithmElements().on("click", this.handleAlgorithmClick.bind(this));

      var bounds = [this.canvasWidth, this.canvasHeight];

      this.graph = new Graph(this.ctx, bounds, true);
    };

    GraphrApp.prototype.run = function () {
      // window.requestAnimationFrame(() =>
      //     this.renderLoop()
      // );
      this.render();
    };

    GraphrApp.prototype.handleAlgorithmClick = function (e) {
      this.graph.beginAlgorithm(e.target.dataset.algorithmName);
      this.graph.executingAlgorithm.next();
      this.graph.executingAlgorithm.setAutoStepInterval(1000);
    };

    GraphrApp.prototype.setCanvasSize = function () {
      this.canvasWidth = window.innerWidth;
      this.canvasHeight = window.innerHeight;
      this.canvas.attr("height", this.canvasHeight).attr("width", this.canvasWidth);
    };

    GraphrApp.prototype.render = function () {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.ctx.fillStyle = "lightblue";
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      // this.graph.render(this.ctx);

      // window.requestAnimationFrame(() =>
      //     this.renderLoop()
      // );
    };

    GraphrApp.prototype.collidesWithAny = function (otherNode) {
      for (var _iterator = this.graph.vertices[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        var node = _step.value;
        if (node.collidesWith(otherNode)) {
          return true;
        }
      }

      return false;
    };

    return GraphrApp;
  })();

  $(document).ready(function () {
    window.App = new GraphrApp();
    var graph = App.graph;

    // Setup event handler
    var latencies = {
      longpress: 0
    };
    var eh = new EventHandler("#canvas", latencies);
    graph.eventHandler = eh;
    var nextNodeValue = 1;

    var canvas = document.getElementById("canvas");

    // register handlers
    canvas.addEventListener("mousedown", function (e) {
      return eh.mousedownHandler(e);
    });
    canvas.addEventListener("mouseup", function (e) {
      return eh.mouseupHandler(e);
    });

    // register custom handlers
    canvas.addEventListener("longpress", function () {
      var newNode = new Node(nextNodeValue, eh.mousePosX, eh.mousePosY);
      if (!App.collidesWithAny(newNode)) {
        graph.addNode(newNode);
        nextNodeValue += 1;
        console.log("Success!");
      }
    }, false);

    canvas.addEventListener("edgecreated", function (e) {
      var fromNode = e.detail.start;
      var toNode = e.detail.end;
      graph.addEdge(fromNode, toNode, _.random(1, 100));
    });

    // console.log(graph.getEdgesFrom(graph.getVertex(0)))


    App.run();
  });
});