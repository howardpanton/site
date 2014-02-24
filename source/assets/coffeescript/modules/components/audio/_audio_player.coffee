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
        $("audio").each ->
            $(this).audioPlayer()
        return
    return

$(document).ready ->
    if $("audio").length > 0
        initAudio()

