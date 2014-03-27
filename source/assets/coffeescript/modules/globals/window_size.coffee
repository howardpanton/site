###
		-------------------------------------------------------------
				checkWindowSize() function
					Adds width classes to <body> tag.
					Used for tablet, desktop, mobile styling
		-------------------------------------------------------------
###


@checkWindowSize = ->

	#reset
	_grid_size = ""
	_width = ""
	_html_tag = ""

	#reset all body size classes before adding an updated one
	$('body').removeClass("gDesktop gTablet gMobile")

	_html_tag = $('html')

	# get screen width
	_width = $(window).width()
	_grid_size 	= "gDesktop" if _width > 959
	_grid_size 	= "gTablet"  if (_width > 599) and (_width < 959)
	_grid_size 	= "gMobile"  if _width < 599

	# console.log "screen width is: " + _grid_size

	$('body').addClass(_grid_size)

###
		-------------------------------------------------------------
				getWindowSize()

					Returns the current window size that has been added
					to the <body> tag

					The function will return
						"gDesktop", "gTablet" or "gMobile"

					The function will return "gDesktop" by default,
					if none of the classes above are added to the body class

		-------------------------------------------------------------
###

@getWindowSize = ->

	_body = ""
	_body = $('body')
	if (_body.hasClass("gDesktop"))
		return "gDesktop"
	else if (_body.hasClass("gTablet"))
		return "gTablet"
	else if (_body.hasClass("gMobile"))
		return "gMobile"
	else
		# return default value if no matches found
		return "gDesktop"




