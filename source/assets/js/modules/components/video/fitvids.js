/*
    -------------------------------------------------------------
        checkForFitVids()

        use fitVids for responsive videos on any video with a .__media class

    -------------------------------------------------------------
*/

function checkForFitVids() {

    if ($('.__media').length > 0) {
      $.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.fitvids-ck.js', function() {
        $('.__media').fitVids();
      });
    }

}
