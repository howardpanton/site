/*
    -------------------------------------------------------------
        checkForLightbox()

        detect and show magnific lightbox
    -------------------------------------------------------------
*/

function checkForLightbox() {

    // detect lightbox component
    if ($('.js-lightbox').length > 0) {

        $.getScript('http://static.arts.ac.uk/assets/js/magnific-lightbox-ck.js', function() {

            $('.js-lightbox').each(function() {
              $(this).magnificPopup({
                delegate: 'a',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                  enabled: true,
                  navigateByImgClick: true,
                  preload: [0,1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                  tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
                }
              });
            });

        });
    }

}
