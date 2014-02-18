#
#    -------------------------------------------------------------
#        Breadcrumbs
#    -------------------------------------------------------------
#
breadcrumbs = ->
  jQuery ->
    $(".breadcrumbs").find("a").last().hide()
    $(".browse-sc").find(".breadcrumbs").find("a:gt(4)").remove()
