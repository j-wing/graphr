import {ALGORITHM_STATES} from "dist/algorithms/algorithms"

export class Sidebar {
	constructor() {
		this.toggle = $("#sidebar-toggle");
		this.element = $("#sidebar");
		this.toggleList = $("#sidebar, #sidebar-toggle");
		this.algoElem = $(".algorithm-list", this.element);
		this.addToggleEvent();

		this.fillAlgorithmSection();
	}

	addToggleEvent() {
		/*
			Add the event for toggling behavior.
		*/
		$(this.toggle).on("click", () => {
			if (this.toggle.hasClass("toggled")) {
				this.toggleList.removeClass("toggled")
			} else {
				this.toggleList.addClass("toggled");
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
	}

	getAlgorithmElements() {
		/* 
			Returns a jQuery collection of the elements representing the algorithms.

			Used by App to add click handlers.
		*/
		return $(".algorithm", this.algoElem);
	}


	fillAlgorithmSection() {
		/*
			Appends a <li /> elements to the algorithm list, based on the list in ALGORITHM_STATES.
		*/
		var listItem;
		for (let algorithm of Object.keys(ALGORITHM_STATES)) {
			listItem = $(`<li class="submenu-item algorithm" data-algorithm-name="${algorithm}">${algorithm}</li>`);
			this.algoElem.append(listItem);
		}
	}
}