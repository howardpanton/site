#
#    -------------------------------------------------------------
#        initFitVids()
#
#        use fitVids for responsive videos on any video with a .__media class
#
#    -------------------------------------------------------------
#

initFitVids = ->

    $.getScript "http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.fitvids-ck.js", ->
        $(".__media").fitVids()

$(document).ready ->

    if (($("video").length > 0) or ($(".video-container").length > 0))
        initFitVids()
