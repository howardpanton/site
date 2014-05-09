# #
# #    -------------------------------------------------------------
# #        getEventsFeed()
# #
# #        Display feed of events from http://events.arts.ac.uk/
# #    -------------------------------------------------------------
# #

@getEventsFeed = ->

	$.getJSON "http://events.arts.ac.uk/apex/eventsfeed?callback=?", (data) ->
		output = "<ul class=\"cf\">"
		count = 6
		$.each data, (i, item) ->
			if i < count
				events = data.Events[i]

				output += "
				<li><p>" + events.id + "</p></li>"

		output += "</ul></div>"
		$(".events-feed").html output
		return

$(document).ready ->

		# detect events feed component
		if $(".events-feed").length > 0
			$.each $(".events-feed"), ->
				getEventsFeed()
