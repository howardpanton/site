#
#    -------------------------------------------------------------
#        checkForAudio()
#
#        detect and handle audio/podcast players
#
#    -------------------------------------------------------------
#

initAudio = ->

    jQuery.getScript "http://d27lwoqz7s24cy.cloudfront.net/assets/js/audioplayer.js", ->
      $("audioplayer").each ->
        $(this).audioPlayer()

$(document).ready ->
    if $("audioplayer").length > 0
        initAudio()

