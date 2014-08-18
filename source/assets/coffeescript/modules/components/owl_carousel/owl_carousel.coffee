#
#    -------------------------------------------------------------
#        initOwlCarousel()
#
#        detect owl carousel (used in research profiles section)
#    -------------------------------------------------------------
#


initOwlCarousel = ->

	jQuery.getScript "http://static.arts.ac.uk/assets/js/owl.carousel.min.js", ->
		owl_carousel = $(".owl-carousel");
		owl_carousel.each ->
			$(this).owlCarousel
				margin: 36
				responsive: {
					0:{
						items: 1
					}
					600:{
						items: 2
					}
					960:{
						items: 3
					}
				}
				lazyLoad: true
				nav: true
				dots: false
				navText: [
					"<i class='icon-left-open-big'></i>"
					"<i class='icon-right-open-big'></i>"
				]
			return

			# add pagination to each item in the carousel
			# owl_carousel.each ->
			# 		total_items = $(".item", this).length
			# 		$(".item-description", this).append (i) ->
			# 				$ "<span />",
			# 				text: i + 1 + " of " + total_items
			# 		return
			# return

	return


$(document).ready ->
		if $(".owl-carousel").length > 0
				initOwlCarousel()

