#
#    -------------------------------------------------------------
#        searchFocusHighlight()
#
#        Focus highlighting for course search and site search input box.
#        Adds a gray border around search inputs on focus
#    -------------------------------------------------------------
#
searchFocusHighlight = ->

    $("#finder-search-input").focus ->
        $("#finder-search-input").parent().parent().addClass "search-gray-border"

$(document).ready ->
    if $(".search-input-wrap").length > 0
        searchFocusHighlight()
