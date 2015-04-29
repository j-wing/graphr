import DFSState from "dist/algorithms/dfs";
import BFSState from "dist/algorithms/bfs";
import DijkstraState from "dist/algorithms/dijkstras";

/*
    This is a constant, representing a mapping of:
    <human-readable algorithm name> => AlgorithmState subclass for that algorithm
*/
export const ALGORITHM_STATES = {
    'DFS':DFSState,
    'BFS':BFSState,
    'Dijkstra\'s':DijkstraState,

}

window.ALGORITHM_STATES = ALGORITHM_STATES