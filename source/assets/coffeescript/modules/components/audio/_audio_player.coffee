#
#    -------------------------------------------------------------
#        checkForAudio()
#
#        detect and handle audio/podcast players
#
#    -------------------------------------------------------------
#

initAudio = ->
    jQuery.getScript "http://static.arts.ac.uk/assets/js/audioplayer.js", ->
        $("audio").each ->
            $(this).audioPlayer()
        return
    return

$(document).ready ->
    if $("audio").length > 0
        initAudio()

