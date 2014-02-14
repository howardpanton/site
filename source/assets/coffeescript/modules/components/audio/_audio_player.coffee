#
#    -------------------------------------------------------------
#        checkForAudio()
#
#        detect and handle audio/podcast players
#
#    -------------------------------------------------------------
#
checkForAudio = ->
  if $("audio").length > 0
    jQuery.getScript "http://d27lwoqz7s24cy.cloudfront.net/assets/js/audioplayer.js", ->
      $("audio").each ->
        $(this).audioPlayer()
