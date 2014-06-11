#
#    -------------------------------------------------------------
#      Custom click Tracking events for Universal Analytics
#
#
#
#    -------------------------------------------------------------
#

$(".megamenu .dropdown_fullwidth a").click ->
  ga('send', '_trackEvent', 'Navigation', 'Click', 'Header', $(this).attr("href"));

  # _gaq.push [
  #   "_trackEvent"
  #   "Navigation"
  #   "Header"
  #   $(this).attr("href")
  # ]
  # _gaq.push [
  #   "two._trackEvent"
  #   "Navigation"
  #   "Header"
  #   $(this).attr("href")
  # ]

  return true
