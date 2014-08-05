$(document).ready ->

	#initialise megaMenu (main UAL navigation dropdowns)

	if (!$("html").hasClass("ie8"))
		$(".megamenu").megaMenuCompleteSet
		  menu_effect: "open_close_slide" # Drop down effect, choose between 'hover_fade', 'hover_slide', etc.
		  menu_click_outside: 1 # Clicks outside the drop down close it (1 = true, 0 = false)
		  menu_show_onload: 0 # Drop down to show on page load (type the number of the drop down, 0 for none)
		  menu_responsive: 1 # 1 = Responsive, 0 = Not responsive
		return true


# close megamenu dropdowns on ESC key press
$(document).keyup (e) ->

	focusedElem = $(document.activeElement)
	# if escape key is pressed, close megamenu dropdowns if opened
	if e.keyCode is 27
		# handle tab focus to switch back to top level link if inside a dropdown when ESC key pressed
  	_parent_menu_btn = focusedElem.closest(".menu-btn")

  	if (_parent_menu_btn.hasClass("active"))
  		document.activeElement.blur()
  		_parent_menu_btn.find("a.megamenu_drop").trigger('focus')

  	# close any open megamenu tabs
  	$(".menu-btn").removeClass "active"
  	$(".dropdown_fullwidth").css "display", "none"
  return true
