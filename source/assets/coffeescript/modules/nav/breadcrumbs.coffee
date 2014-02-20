#
#    -------------------------------------------------------------
#        Breadcrumbs
#    -------------------------------------------------------------
#
breadcrumbs = ->
    $(".breadcrumbs").find("a").last().hide()
    $(".browse-sc").find(".breadcrumbs").find("a:gt(4)").remove()

$(document).ready ->
    breadcrumbs()
