###
    -------------------------------------------------------------
        Format date (crop long date & time into shorter date)
    -------------------------------------------------------------
###

if $(".date").length > 0
    $(".date").each (i, element) ->

      str = $(this).text()

      if (str.indexOf(",") != -1)
        $(this).text(str.substring(5,16))
