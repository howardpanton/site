#
#    -------------------------------------------------------------
#        dev debug tools show hide
#    -------------------------------------------------------------
#

debugSwitch = ->
    $("#debug").hide()
    $(".debug-toggle").click (e) ->
        $("#debug").toggle()
        e.preventDefault()

$(document).ready ->
    debugSwitch
