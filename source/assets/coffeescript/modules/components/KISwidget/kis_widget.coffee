#
#    -------------------------------------------------------------
#        kisWidget()
#
#        detect and load KIS Widget
#    -------------------------------------------------------------
#
kisWidget = ->
    ((d) ->
      "use strict"
      widgetScript = d.createElement("script")
      widgetScript.id = "unistats-widget-script"
      widgetScript.src = "//widget.unistats.ac.uk/js/unistats.widget.js"
      scriptTags = d.getElementsByTagName("script")[0]
      return  if d.getElementById("unistats-widget-script")
      scriptTags.parentNode.insertBefore widgetScript, scriptTags
    ) document


$(document).ready ->
    if $(".kis-widget").length > 0
        kisWidget()
