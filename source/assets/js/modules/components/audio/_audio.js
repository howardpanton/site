/*
    -------------------------------------------------------------
        checkForAudio()

        detect and handle audio/podcast players

    -------------------------------------------------------------
*/

function checkForAudio() {
    if ($('audio').length > 0) {

    jQuery.getScript('http://static.arts.ac.uk/assets/js/audioplayer.js', function() {

        $('audio').each(function() {
          $(this).audioPlayer();
        });

    });

  }
}
