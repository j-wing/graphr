export class Infobox {
    constructor() {
        this.element = $("#infobox");
        this.nodeTable = $("<table><thead><tr><td>Node:</td><td>Dist: </td></tr></thead><tbody></tbody></table>");
        this.element.append(this.nodeTable);
    }

    show() {
        this.element.show();
    }

    close() {
        this.element.empty();
        this.element.hide();
    }
}

export class DijkstraInfobox extends Infobox {
    constructor(state) {
        super();
        this.state = state;
    }

    update() {
        var tableBody = $("<tbody></tbody>");
        for (let node of this.state.graph.vertices) {
            tableBody.append($(`<tr><td>${node.value}: </td><td>${this.state.dist[node]}</td></tr>`))
        }

        $("tbody", this.nodeTable).empty().html(tableBody.html());

        if (this.state.isFinished) {
            this.element.append("<div>Done!</div>");
        }
    }
}