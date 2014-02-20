#
#    -------------------------------------------------------------
#        externalLinks()
#
#        creates custom :external selector
#
#        Adds 'external' class to all external links
#    -------------------------------------------------------------
#
externalLinks = ->

    # create :external selector
    jQuery.expr[":"].external = (obj) ->
        obj.hostname isnt location.hostname

    # Add external class to links
    $(".l-content a:external.button-link, aside a:external").addClass("external").each ->
        $(this).attr "title", $(this).attr("title") + "(external link)"


$(document).ready ->
    externalLinks()
