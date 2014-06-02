$(document).ready ->

	#initialise megaMenu (main UAL navigation dropdowns)
	$(".megamenu").megaMenuCompleteSet
    menu_effect: "open_close_slide" # Drop down effect, choose between 'hover_fade', 'hover_slide', etc.
    menu_click_outside: 1 # Clicks outside the drop down close it (1 = true, 0 = false)
    menu_show_onload: 0 # Drop down to show on page load (type the number of the drop down, 0 for none)
    menu_responsive: 1 # 1 = Responsive, 0 = Not responsive
  return true
