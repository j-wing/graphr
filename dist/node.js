define(["exports"], function (exports) {
  "use strict";

  var Node = (function () {
    var Node =
    /* Constructors */
    function Node(value, pos) {
      this.value = value;
      this.radius = 5; // some arbitrary value for now
      this.pos = pos;
    };

    Node.prototype.render = function () {};

    Node.prototype.drawArc = function () {};

    return Node;
  })();

  exports.Node = Node;
});