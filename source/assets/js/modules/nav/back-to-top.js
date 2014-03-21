/*
		-------------------------------------------------------------
				.back-to-top click handler
					Scroll to the top of the page
					when a link with .back-to-top class clicked

					On desktop the button will fade in
		-------------------------------------------------------------
*/

function backToTop() {
	jQuery(function() {
		checkScroll()(function() {
			if ($("html").hasClass("desktop")) {
				if ($(this).scrollTop() > 450) {
					return $('.back-to-top').fadeIn(200);
				} else {
					return $('.back-to-top').fadeOut(200);
				}
			}
		});

		$(window).scroll(checkScroll());
		return $("back-to-top").click(function(event) {
			event.preventDefault();
			return $("html, body").animate({
				scrollTop: 0
			}, 300);
		});
	});
}
