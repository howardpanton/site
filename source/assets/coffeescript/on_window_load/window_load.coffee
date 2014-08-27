#
#    -------------------------------------------------------------
#        $(window).load() function
#
#        script runs once the content on the page has been
#        loaded
#    -------------------------------------------------------------
#

$(window).load ->

		# run fitHeights() on page elements
		if $(".related-content").length > 0
			$(".related-content ul").each ->
				$(this).find("li").fitHeights()

		if $(".highlight-box-3 ul").length > 0
			$(".related-content ul").each ->
				$(this).find("li").fitHeights()

		if $("body").is(".chelsea, .camberwell, .wimbledon")
				$(".two-up ul").each ->
					$(this).find("li").fitHeights()
				$(".three-up ul").each ->
					$(this).find("li").fitHeights()

		if $("body").is(".ual")
				$(".cta .two-up-full ul").each ->
					$(this).find("li").fitHeights()
				$(".st-cp .two-up-full ul").each ->
					$(this).find("li").fitHeights()
				$(".news .four-up-full ul").each ->
					$(this).find("li").fitHeights()
				$(".fe .four-up-full ul").each ->
					$(this).find("li").fitHeights()

		if $(".__gallery").length > 0
				$(".__gallery").each ->
						$(this).find("li").fitHeights()

		if $("#map-canvas").length > 0
				loadMapsScript()


