#
#    -------------------------------------------------------------
#        expandableContent()
#
#        detect and handle expandable content blocks
#    -------------------------------------------------------------
#
expCB = ->

    $(".expanded-content").hide()
    $(".show-more").show()

    # handle "Show More" button click
    $(".show-more").click (e) ->
      e.preventDefault()
      _clicked = $(this)
      _clicked.closest(".expandable-content").find(".expanded-content").slideDown()
      _clicked.parent().hide()

    # handle "Show Less" button click
    $(".hide-content").click (e) ->
      e.preventDefault()
      _clicked = $(this)
      ecb = _clicked.closest(".expandable-content")

      $(".expanded-content", ecb).hide()
      $(ecb).find(".show-more").parent().show()

      # scroll the page to the expandable content heading after clicking hide-content
      $('html, body').animate({
        scrollTop: ecb.offset().top
    	}, 300);


$(document).ready ->

   if $(".expanded-content").length > 0
        expCB()
