#
#    -------------------------------------------------------------
#        typographyMods()
#    -------------------------------------------------------------
#

typographyMods = ->

    # add span to lcf headings for styling
    $(".lcf").find("h2").wrapInner "<span />"

    # add class to last paragraph in content
    $('h2').prev('p').addClass('last')

$(document).ready ->
    typographyMods()
