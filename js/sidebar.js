$(document).ready(function() {

	$("#sidebar-toggle").on("click", function() {
		var toggle = jQuery(this)
		var sidebar = jQuery("#sidebar")

		if (toggle.hasClass("toggled")) {
			toggle.removeClass("toggled")
			sidebar.removeClass("toggled")
		} else {
			toggle.addClass("toggled")
			sidebar.addClass("toggled")
		}
	})

	$("#sidebar li.menu-item").on("click", function(e) {
		if (e.target.nodeName == "DIV") {
			if ($(this).hasClass("toggled")) {
				$(this).removeClass("toggled")
			} else {
				// $("#sidebar li.menu-item").removeClass("toggled")
				$(this).addClass("toggled")
			}
		}
	})

})