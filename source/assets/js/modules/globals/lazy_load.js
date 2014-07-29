/*
    -------------------------------------------------------------
        lazyLoadImgs()

        Lazy load reSRC.it images

        ---------------

        imgLoaded(img)

        Not part of MixItUp, but this is a great lightweight way
        to gracefully fade-in images with CSS3 after they have loaded
    -------------------------------------------------------------
*/

function lazyLoadImgs() {
  if ($('.resrc').length > 0) {
    $.getScript('http://static.arts.ac.uk/assets/js/jquery.review.min.js', function() {
      $('.resrc').review({
        callback: function() {
          resrc.resrc(this);
        }
      });
    });
  }


// NICE IMAGE LOADING
function imgLoaded(img){
  $(img).parent().addClass('loaded');
}
