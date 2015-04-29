define(["exports", "dist/canvas_utils"], function (exports, _distCanvasUtils) {
  "use strict";

  var _classProps = function (child, staticProps, instanceProps) {
    if (staticProps) Object.defineProperties(child, staticProps);
    if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
  };

  var CanvasUtils = _distCanvasUtils.CanvasUtils;
  var Node = (function () {
    var Node =
    /* Constructors */
    function Node(value, x, y) {
      if (x === undefined) x = null;
      if (y === undefined) y = null;
      this.value = value;
      this.radius = 25;
      this.x = x;
      this.y = y;

      this.clicked = false;
    };

    Node.prototype.setAngle = function (a) {
      this.angle = a;
    };

    Node.prototype.getAngle = function () {
      return this.angle;
    };

    Node.prototype.setSelected = function (selected) {
      this.selected = selected;
      if (selected) {
        CanvasUtils.drawCircleOutline(this.ctx, this.x, this.y, this.radius + 1, 3, "green");
      } else {
        CanvasUtils.drawCircleOutline(this.ctx, this.x, this.y, this.radius + 1, 3, "lightblue");
      }
    };

    Node.prototype.posInBound = function (pos) {
      var checkX = Math.abs(pos[0] - this.x) < this.radius;
      var checkY = Math.abs(pos[1] - this.y) < this.radius;
      return checkX && checkY;
    };

    Node.prototype.collidesWith = function (node) {
      var xmin = node.x - node.radius;
      var xmax = node.x + node.radius;
      var ymin = node.y - node.radius;
      var ymax = node.y + node.radius;
      var checkX = this.x - this.radius >= xmax || xmin >= this.x + this.radius;
      var checkY = this.y - this.radius >= ymax || ymin >= this.y + this.radius;
      return !(checkX || checkY);
    };

    Node.prototype.handleClick = function () {
      if (!this.clicked) {
        CanvasUtils.drawCircleOutline(this.ctx, this.x, this.y, this.radius + 1, 1, "rgb(69,140,191)");
      } else {
        CanvasUtils.drawCircleOutline(this.ctx, this.x, this.y, this.radius + 2, 4, "lightblue");
      }
      this.clicked = !this.clicked;
    };

    Node.prototype.render = function (ctx) {
      /* if x and y are undefined, don't render this node. */
      if (!this.x || !this.y) {
        return;
      }

      // Hacky solution
      this.ctx = ctx;

      // Then render the actual node
      // radius = this.value.toString()
      var radius = 25;
      CanvasUtils.drawCircle(ctx, this.x, this.y, radius, "white");
      CanvasUtils.drawText(ctx, this.x, this.y, this.value.toString());
    };

    Node.prototype.toString = function () {
      return this.value.toString();
    };

    _classProps(Node, null, {
      coords: {
        set: function (pair) {
          this.x = pair[0];
          this.y = pair[1];
        },
        get: function () {
          return [this.x, this.y];
        }
      },
      boundingRect: {
        get: function () {
          return [this.x - this.radius, this.y - this.radius, this.x + this.radius, this.y + this.radius];
        }
      }
    });

    return Node;
  })();

  exports.Node = Node;
});