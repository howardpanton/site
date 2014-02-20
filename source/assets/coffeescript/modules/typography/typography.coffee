#
#    -------------------------------------------------------------
#        typographyMods()
#    -------------------------------------------------------------
#

typographyMods = ->
    # add span to lcf headings for styling
    $(".lcf").find("h2").wrapInner "<span />"

$(document).ready ->
    typographyMods()
