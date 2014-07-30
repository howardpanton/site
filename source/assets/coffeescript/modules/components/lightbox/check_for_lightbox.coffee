#
#    -------------------------------------------------------------
#        initLightbox()
#
#        detect and show magnific lightbox
#    -------------------------------------------------------------
#
initLightbox = ->

    $.getScript "http://static.arts.ac.uk/assets/js/magnific-lightbox-ck.js", ->
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


$(document).ready ->
    # detect lightbox component
    if $(".js-lightbox").length > 0
        initLightbox()


