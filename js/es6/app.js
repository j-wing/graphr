import {Node} from "dist/node"
import {Edge} from "dist/edge"
import {Graph} from "dist/graph"

class UserOptions {
    /* Class that manages options that the user can toggle. */

    constructor() {
        this._options = {
            "GRAPH_DIRECTED":true,
        }
    }

    get options() {
        return this._options;
    }

    setOption(option, value) {
        this._options[option] = value;
    }
}

class GraphrApp {
    constructor() {
        this.canvas = $("canvas");
        this.ctx = this.canvas[0].getContext("2d");
        this.setCanvasSize();
        this.options = new UserOptions();

        this.graph = Graph.randomGraph();
    }

    run() {
        window.requestAnimationFrame(() =>
            this.renderLoop()
        );
    }

    setCanvasSize() {
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.canvas.attr("height", this.canvasHeight).attr("width", this.canvasWidth);
    }

    renderLoop() {
        this.ctx.fillStyle = "lightblue";
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.graph.render(this.ctx);

        window.requestAnimationFrame(() =>
            this.renderLoop()
        );
    }
}

$(document).ready(function() {
    window.App = new GraphrApp();
    App.run();
})