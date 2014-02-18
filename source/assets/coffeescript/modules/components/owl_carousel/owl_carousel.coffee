#
#    -------------------------------------------------------------
#        checkForOwlCarousel()
#
#        detect owl carousel (used in research profiles section)
#    -------------------------------------------------------------
#


# checkForOwlCarousel = ->
#     if $(".owl-carousel").length > 0
#         jQuery.getScript "http://d27lwoqz7s24cy.cloudfront.net/assets/js/owl.carousel.js", ->
#             $(".owl-carousel").each ->
#                 $(this).owlCarousel
#                     items: 3
#                     itemsDesktop: [ 1280, 3 ]
#                     itemsTablet: [ 959, 2 ]
#                     itemsMobile: [ 599, 1 ]
#                     lazyLoad: true
#                     pagination: false
#                     navigation: true
#                     navigationText: [
#                         "<i class='icon-left-open-big'></i>"
#                         "<i class='icon-right-open-big'></i>"
#                     ]
#                 return


#                 # add pagination to each item in the carousel
#                 $(".owl-carousel").each ->
#                     total_items = $(".item", this).length
#                     $(".item-description", this).append (i) ->
#                         $ "<span />",
#                         text: i + 1 + " of " + total_items
#                     return
#                 return

#             return

