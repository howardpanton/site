#
#    -------------------------------------------------------------
#        Breadcrumbs
#    -------------------------------------------------------------
#
breadcrumbs = ->
    $(".breadcrumbs").find("a").last().hide()

$(document).ready ->
    breadcrumbs()
