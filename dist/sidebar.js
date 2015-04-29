define(["exports", "dist/algorithms/algorithms"], function (exports, _distAlgorithmsAlgorithms) {
  "use strict";

  var ALGORITHM_STATES = _distAlgorithmsAlgorithms.ALGORITHM_STATES;
  var Sidebar = (function () {
    var Sidebar = function Sidebar() {
      this.toggle = $("#sidebar-toggle");
      this.element = $("#sidebar");
      this.toggleList = $("#sidebar, #sidebar-toggle");
      this.algoElem = $(".algorithm-list", this.element);
      this.addToggleEvent();

      this.fillAlgorithmSection();
    };

    Sidebar.prototype.addToggleEvent = function () {
      var _this = this;
      /*
      	Add the event for toggling behavior.
      */
      $(this.toggle).on("click", function () {
        if (_this.toggle.hasClass("toggled")) {
          _this.toggleList.removeClass("toggled");
        } else {
          _this.toggleList.addClass("toggled");
        }
      });

      // $("li.menu-item", this.element).on("click", function(e) {
      // 	if (e.target.nodeName == "DIV") {
      // 		if ($(this).hasClass("toggled")) {
      // 			$(this).removeClass("toggled")
      // 		} else {
      // 			// $("#sidebar li.menu-item").removeClass("toggled")
      // 			$(this).addClass("toggled")
      // 		}
      // 	}
      // }).addClass("toggled");
    };

    Sidebar.prototype.getAlgorithmElements = function () {
      /* 
      	Returns a jQuery collection of the elements representing the algorithms.
      		Used by App to add click handlers.
      */
      return $(".algorithm", this.algoElem);
    };

    Sidebar.prototype.fillAlgorithmSection = function () {
      /*
      	Appends a <li /> elements to the algorithm list, based on the list in ALGORITHM_STATES.
      */
      var listItem;
      for (var _iterator = Object.keys(ALGORITHM_STATES)[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        var algorithm = _step.value;
        listItem = $("<li class=\"submenu-item algorithm\" data-algorithm-name=\"" + algorithm + "\">" + algorithm + "</li>");
        this.algoElem.append(listItem);
      }
    };

    return Sidebar;
  })();

  exports.Sidebar = Sidebar;
});