import {DFSState} from "dist/algorithms/dfs";

/*
    This is a constant, representing a mapping of:
    <human-readable algorithm name> => AlgorithmState subclass for that algorithm
*/
export const ALGORITHM_STATES = {
    'DFS':DFSState
}

window.ALGORITHM_STATES = ALGORITHM_STATES