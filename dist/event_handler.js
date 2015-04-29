define(["exports"], function (exports) {
  "use strict";

  var _classProps = function (child, staticProps, instanceProps) {
    if (staticProps) Object.defineProperties(child, staticProps);
    if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
  };

  var EventHandler = (function () {
    var EventHandler = function EventHandler(canvasID, latencies) {
      this._interactables = [];
      this.mousePos = [0, 0];

      // Cache the $(canvas) jQuery object
      this.canvas = $(canvasID);

      // Define custom events
      this.longpressLatency = latencies.longpress;
    };

    EventHandler.prototype.addInteractable = function (interactable) {
      this._interactables.push(interactable);
    };

    EventHandler.prototype.getCurrMousePos = function (e) {
      return [e.pageX - this.canvas.offset().left, e.pageY - this.canvas.offset().top];
    };

    EventHandler.prototype.mousedownHandler = function (e) {
      var _this = this;
      // console.log(this.canvas)
      this.mousePos = this.getCurrMousePos(e);

      console.log(this.mousePos);
      console.log("mousedown");

      this.mousedown = true;

      // Trigger a longPress event if mousedown for > 1sec
      this.longPress = window.setTimeout(function () {
        _this.mousedown = false;

        var e = new CustomEvent("longpress", {
          detail: {},
          bubbles: true,
          cancelable: true
        });

        _this.canvas[0].dispatchEvent(e);
      }, this.longpressLatency);
    };

    EventHandler.prototype.mouseupHandler = function (e) {
      // Cancel the longPress event if mouseup

      window.clearTimeout(this.longPress);

      // Update mousePos
      var endPos = this.getCurrMousePos(e);

      console.log("mouseup");

      // check if endPos is in some interactable's bounds,
      // and if so, call the corresponding click method
      var startNode = null;
      var endNode = null;
      for (var _iterator = this._interactables[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        var interactable = _step.value;
        if (interactable.posInBound(this.mousePos)) {
          startNode = interactable;
        }

        if (interactable.posInBound(endPos)) {
          endNode = interactable;
        }
      }

      if (startNode != null & endNode != null) {
        if (startNode === endNode) {
          startNode.handleClick();
        } else {
          // Dispatch an event to create an edge
          var e = new CustomEvent("edgecreated", {
            detail: {
              start: startNode,
              end: endNode
            },
            bubbles: true,
            cancelable: false
          });

          $("#canvas")[0].dispatchEvent(e);
        }
      }

      this.mousedown = false;
    };

    _classProps(EventHandler, null, {
      mousePosX: {
        get: function () {
          return this.mousePos[0];
        }
      },
      mousePosY: {
        get: function () {
          return this.mousePos[1];
        }
      }
    });

    return EventHandler;
  })();

  exports.EventHandler = EventHandler;
});