#
#    -------------------------------------------------------------
#        expandableContent()
#
#        detect and handle expandable content blocks
#    -------------------------------------------------------------
#
expandableContentBlocks = ->
  if $(".expanded-content").length > 0
    $(".expanded-content").hide()
    $(".show-more").show()

    # handle "Show More" button click
    $(".show-more").click (e) ->
      e.preventDefault()
      _clicked = $(this)
      _clicked.closest(".expandable-content").find(".expanded-content").slideDown()
      _clicked.hide()


    # handle "Show Less" button click
    $(".hide-content").click (e) ->
      e.preventDefault()
      _clicked = $(this)
      parent = _clicked.closest(".expandable-content")
      $(".expanded-content", parent).hide()
      $(parent).find(".show-more").show()
      parent.scrollToMe() # make sure the that page scrolls back after hiding the expanded content
