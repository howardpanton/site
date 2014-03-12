###
		-------------------------------------------------------------
				checkWindowSize() function
					Adds width classes to <body> tag.
					Used for tablet, desktop, mobile styling
		-------------------------------------------------------------
###

checkWindowSize = ->

	# get screen width
	width = $(window).width()

	# calc body class name to add based on screen width
	new_class = (if width > 959 then "gDesktop" else (if width > 599 then "gTablet" else (if 600 > width then "gMobile" else (if width > 1289 then "gDesktop" else ""))))

	# remove any existing body class and add the new_body_class
	$(document.body).removeClass("gDesktop gTablet gMobile").addClass new_class
	console.log("window size is: " + width);
	return


## run function
checkWindowSize();


$(document).ready ->
		checkWindowSize()

