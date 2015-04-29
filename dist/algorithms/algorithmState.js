define(["exports"], function (exports) {
  "use strict";

  var AlgorithmState = (function () {
    var AlgorithmState = function AlgorithmState(graph) {
      this.graph = graph;
      this.isFinished = false;
      this.startNode = null;
      this.endNode = null;
      this.autoStepInterval = 0;
      this.autoStepTimer = null;
    };

    AlgorithmState.prototype.cancel = function () {
      if (this.autoStepTimer) {
        clearTimeout(this.autoStepTimer);
      }
    };

    AlgorithmState.prototype.requiresStartNode = function () {
      /*
          Abstract method;
          returns true if this state requires a start node to begin.
          Defaults to false.
      */
      return false;
    };

    AlgorithmState.prototype.requiresEndNode = function () {
      /*
          Abstract method;
          returns true if this state requires an end node.
          Also defaults to false.
      */
      return false;
    };

    AlgorithmState.prototype.setStartNode = function (node) {
      /*
          Abstract method;
      */
      this.startNode = node;
    };

    AlgorithmState.prototype.setEndNode = function (node) {
      this.endNode = node;
    };

    AlgorithmState.prototype.autoStep = function () {
      if (!this.isFinished) {
        this.next();
        this.autoStepTimer = setTimeout(this.autoStep.bind(this), this.autoStepInterval);
      } else {
        this.graph.algorithmFinished();
      }
    };

    AlgorithmState.prototype.setAutoStepInterval = function (interval) {
      /*
          Sets the interval at which the algorithm automatically calls .next().
          Set to 0 to disable auto-stepping.
           TODO: determine whether this should call autoStep immediately, or after a delay of `interval`
      */
      this.autoStepInterval = interval;
      if (interval !== 0) {
        this.autoStepTimer = setTimeout(this.autoStep.bind(this), this.autoStepInterval);
      }
    };

    AlgorithmState.prototype.next = function () {
      /*
          Abstract method for advancing the state of the algorithm.
      */
      throw "NotImplementedError";
    };

    AlgorithmState.prototype.previous = function () {
      throw "NotImplementedError";
    };

    return AlgorithmState;
  })();

  exports.AlgorithmState = AlgorithmState;
});