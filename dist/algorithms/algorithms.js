define(["exports", "dist/algorithms/dfs", "dist/algorithms/bfs", "dist/algorithms/dijkstras"], function (exports, _distAlgorithmsDfs, _distAlgorithmsBfs, _distAlgorithmsDijkstras) {
  "use strict";

  var DFSState = _distAlgorithmsDfs["default"];
  var BFSState = _distAlgorithmsBfs["default"];
  var DijkstraState = _distAlgorithmsDijkstras["default"];
  var ALGORITHM_STATES = exports.ALGORITHM_STATES = {
    DFS: DFSState,
    BFS: BFSState,
    "Dijkstra's": DijkstraState };

  window.ALGORITHM_STATES = ALGORITHM_STATES;
});