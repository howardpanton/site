###
    -------------------------------------------------------------
        Blockquotes:
          If there are blockquotes or pull-quotes on the page,
          add a <span> to the top of the element
    -------------------------------------------------------------
###

if $("blockquote").length > 0
    $("blockquote").each () ->
        $(this).prepend('<span></span>')

if $(".pull-quote").length > 0
    $(".pull-quote").each () ->
        $(this).prepend('<span></span>')
