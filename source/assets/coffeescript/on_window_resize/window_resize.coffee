#
#    -------------------------------------------------------------
#        $(window).resize() function
#
#        scripts that run when the browser window is resized
#
#				 the script uses a timeout to improve performance and
#				 prevent scripts from being called multiple times while
#        the screen is being resized
#    -------------------------------------------------------------
#

$(window).resize ->
	clearTimeout $.data(this, "resizeTimer")
	$.data this, "resizeTimer", setTimeout(->

		## run checkWindowSize() when window browser is resized
		checkWindowSize()

		## run imageCredits() function
		imageCredits()
		return
	, 200)
	return


