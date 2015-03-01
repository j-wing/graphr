define(["exports"], function (exports) {
  "use strict";

  var Edge = (function () {
    var Edge =
    /* Constructors */
    function Edge(fromNode, toNode, weight) {
      this.fromNode = fromNode;
      this.toNode = toNode;
      this.weight = weight;
    };

    Edge.prototype.render = function () {};

    Edge.prototype.drawLine = function () {};

    return Edge;
  })();
});