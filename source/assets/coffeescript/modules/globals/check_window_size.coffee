###
		-------------------------------------------------------------
				checkWindowSize() function
					Adds width classes to <body> tag.
					Used for tablet, desktop, mobile styling
		-------------------------------------------------------------
###
foo = ""
checkWindowSize = ->

	# get screen width
	width = ""
	width = $(window).width()
	foo 	= "gDesktop" if width > 959
	foo 	= "tablet"  if (width > 599) and (width < 959)
	foo 	= "mobile"  if width < 599
	console.log foo
	# switch width
	# 	when "desktop"
	# 		$(document.body).removeClass("gTablet gMobile").addClass "gDesktop"
	# 	when "tablet"
	# 		$(document.body).removeClass("gDesktop gMobile").addClass "gTablet"
	# 	when "mobile"
	# 		$(document.body).removeClass("gDesktop gTablet").addClass "gMobile"

$(document).ready ->
	checkWindowSize()
	$('body').removeClass("gDesktop")
	console.log(foo)
	# $('body').addClass foo


# $(window).resize ->
# 	clearTimeout $.data(this, "resizeTimer")
# 	$.data this, "resizeTimer", setTimeout(->

# 		## run checkWindowSize() when window browser is resized
# 		checkWindowSize()

# 		imageCredits()
# 		return
# 	, 200)
# 	return
