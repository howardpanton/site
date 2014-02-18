#
#    -------------------------------------------------------------
#        ScrollToMe function: enables scrolling to an element
#          usage:    $("#element").scrollToMe()
#    -------------------------------------------------------------
#
# jQuery.fn.extend scrollToMe: func(->
#   x = undefined
#   x = jQuery(this).offset().top - 100
#   jQuery("html,body").animate
#     scrollTop: x
#   , 500
# )
