#
#    -------------------------------------------------------------
#        checkForLightbox()
#
#        detect and show magnific lightbox
#    -------------------------------------------------------------
#
checkForLightbox = ->

  # detect lightbox component
  if $(".js-lightbox").length > 0
    $.getScript "http://d27lwoqz7s24cy.cloudfront.net/assets/js/magnific-lightbox-ck.js", ->
      $(".js-lightbox").each ->
        $(this).magnificPopup
          delegate: "a"
          type: "image"
          tLoading: "Loading image #%curr%..."
          mainClass: "mfp-img-mobile"
          gallery:
            enabled: true
            navigateByImgClick: true
            preload: [0, 1] # Will preload 0 - before current, and 1 after the current image

          image:
            tError: "<a href=\"%url%\">The image #%curr%</a> could not be loaded."


