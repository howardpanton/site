#
#    -------------------------------------------------------------
#        skipToConent()
#
#        Accessible skip-to-content link to enable skipping
#        the main navigation on screen readers.
#        Adds a 'skip-to-here' id to the page title if one exists.
#        If not, then the class is added to the first div.content-wrapper
#
#    -------------------------------------------------------------
#
skipToContent = ->
  if $(".page-title").length > 0
    $(".page-title").first().attr "id", "skip-to-here"
  else
    $(".content-wrapper").first().attr "id", "skip-to-here"
