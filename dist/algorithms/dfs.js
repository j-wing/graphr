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
  var DFSState = (function (GraphSearchBase) {
    var DFSState = function DFSState() {
      GraphSearchBase.apply(this, arguments);
    };

    _extends(DFSState, GraphSearchBase);

    DFSState.prototype.addToQueue = function (node) {
      this.queue.push(node);
    };

    DFSState.prototype.popNextNode = function () {
      return this.queue.pop();
    };

    return DFSState;
  })(GraphSearchBase);

  exports["default"] = DFSState;
});