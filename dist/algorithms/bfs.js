define(["exports", "dist/algorithms/graphSearch"], function (exports, _distAlgorithmsGraphSearch) {
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

  var GraphSearchBase = _distAlgorithmsGraphSearch["default"];
  var BFSState = (function (GraphSearchBase) {
    var BFSState = function BFSState() {
      GraphSearchBase.apply(this, arguments);
    };

    _extends(BFSState, GraphSearchBase);

    BFSState.prototype.addToQueue = function (node) {
      this.queue.push(node);
    };

    BFSState.prototype.popNextNode = function () {
      return this.queue.shift();
    };

    return BFSState;
  })(GraphSearchBase);

  exports["default"] = BFSState;
});