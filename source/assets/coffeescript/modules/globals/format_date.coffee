###
    -------------------------------------------------------------
        Format date (crop long date & time into shorter date)
    -------------------------------------------------------------
###

formatDateUAL = ->
    $(".date").each (i, element) ->
        str = $(this).text()
        if (str.indexOf(",") != -1)
            $(this).text(str.substring(5,16))

$(document).ready ->
    if $(".date").length > 0
        formatDateUAL()
