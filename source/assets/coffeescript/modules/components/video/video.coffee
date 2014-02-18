#
#    -------------------------------------------------------------
#        checkForVideo()
#
#        detect and handle video (using mediaelement js)
#    -------------------------------------------------------------
#
checkForVideo = ->

    $.getScript "https://raw.github.com/johndyer/mediaelement/master/build/mediaelement-and-player.js", ->
      # pluginPath: 'http://beta.arts.ac.uk/media/beta/beta-assets/plugins/'
      $("video").mediaelementplayer pluginPath: "http://d27lwoqz7s24cy.cloudfront.net/assets/swf/"


$(document).ready ->

    if $("video").length > 0
        checkForVideo()
