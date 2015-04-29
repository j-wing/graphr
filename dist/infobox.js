define(["exports"], function (exports) {
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

  var Infobox = (function () {
    var Infobox = function Infobox() {
      this.element = $("#infobox");
      this.nodeTable = $("<table><thead><tr><td>Node:</td><td>Dist: </td></tr></thead><tbody></tbody></table>");
      this.element.empty().append(this.nodeTable);
    };

    Infobox.prototype.show = function () {
      this.element.show();
    };

    Infobox.prototype.close = function () {
      this.element.empty();
      this.element.hide();
    };

    return Infobox;
  })();

  exports.Infobox = Infobox;
  var DijkstraInfobox = (function (Infobox) {
    var DijkstraInfobox = function DijkstraInfobox(state) {
      Infobox.call(this);
      this.state = state;
    };

    _extends(DijkstraInfobox, Infobox);

    DijkstraInfobox.prototype.update = function () {
      var tableBody = $("<tbody></tbody>");
      for (var _iterator = this.state.graph.vertices[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        var node = _step.value;
        tableBody.append($("<tr><td>" + node.value + ": </td><td>" + this.state.dist[node] + "</td></tr>"));
      }

      $("tbody", this.nodeTable).empty().html(tableBody.html());

      if (this.state.isFinished) {
        this.element.append("<div>Done!</div>");
      }
    };

    return DijkstraInfobox;
  })(Infobox);

  exports.DijkstraInfobox = DijkstraInfobox;
});