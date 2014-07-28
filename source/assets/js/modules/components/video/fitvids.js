/*
    -------------------------------------------------------------
        checkForFitVids()

        use fitVids for responsive videos on any video with a .__media class

    -------------------------------------------------------------
*/

function checkForFitVids() {

    if ($('.__media').length > 0) {
      $.getScript('http://static.arts.ac.uk/assets/js/jquery.fitvids-ck.js', function() {
        $('.__media').fitVids();
      });
    }

}
