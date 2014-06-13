#
#    -------------------------------------------------------------
#      Custom click Tracking events for Universal Analytics
#    -------------------------------------------------------------
#

#  ---------------------------------
#  Header & Main Nav
#  ---------------------------------


# persistent links to colleges in the header
$(".college-link-menu a").click (e) ->
	$this = $(this)
	console.log ("clicked college link from the header to: " + $this.html())
	_gaUAL('send', 'event', 'Header - College links', 'Click', $(this).attr("href"))

	#ga('send', 'event', 'mobile', 'click to call', '888-259-4979');

	return true

# Megamenu Dropdown Open / Close
$(".megamenu a.megamenu_drop").click ->
	$this = $(this)
	if $this.hasClass "icon-search"
  	console.log ("clicked the site search dropdown link")
  	_gaUAL('send', 'event', 'Header - Main Nav', 'Click', 'site-search-dropdown')
	else
		console.log ("clicked the main nav dropdown link: " + $(this).html())
		_gaUAL('send', 'event', 'Header - Main Nav', 'Click', $(this).html())
	return true


# Megamenu Links to Pages inside dropdown
$(".megamenu .dropdown_fullwidth a").click (e) ->
	$this = $(this)
	# e.preventDefault()
	console.log ("clicked the megamenu dropdown link to: " + $(this).attr("href"))
	_gaUAL('send', 'event', 'Header - Megamenu', 'Click', $(this).attr("href"))

	return true



#  ---------------------------------
#  Footer
#  ---------------------------------

# Global UAL Footer
$(".footer-links a").click (e) ->
	$this = $(this)
	console.log ("clicked the footer link to: " + $(this).attr("href"))
	_gaUAL('send', 'event', 'Footer - Global', 'Click', $(this).attr("href"))

	return true


# College Footer Links

$(".college-footer a").click (e) ->
	$this = $(this)
	console.log ("clicked the footer link to: " + $(this).attr("href"))

	_gaUAL('send', 'event', 'Footer - College', 'Click', $(this).attr("href"))

	return true




