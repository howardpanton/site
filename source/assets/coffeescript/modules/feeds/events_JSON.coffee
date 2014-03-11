#
#    -------------------------------------------------------------
#        getEventsFeed()
#
#        Display feed of events from http://events.arts.ac.uk/
#    -------------------------------------------------------------
#
getEventsFeed = ->

  $.getJSON "http://ual.events.cs8.force.com/apex/eventsfeed", (data) ->
    console.log("get events feed json")
    output = "<ul>"
    count = 5
    $.each data, (i, item) ->
        if i < count
            ual_event = data[i]
            output += "<li>" + ual_event.Event_Programme__c + "</li>"
        return

    #console.log(data[i]);
    output += "</ul>"
    $("#events-feed").html output
    return

$(document).ready ->
    # detect events feed component
    if $("#events-feed").length > 0
      # console.log("found id for events feed")
      getEventsFeed()
