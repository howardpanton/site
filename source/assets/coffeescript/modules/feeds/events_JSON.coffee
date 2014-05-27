# #
# #    -------------------------------------------------------------
# #        getEventsFeed()
# #
# #        Display feed of events from http://events.arts.ac.uk/
# #    -------------------------------------------------------------
# #

@getEventsFeed = ->

	# $.getJSON "http://events.arts.ac.uk/apex/eventsfeed?callback=?", (data) ->
	# 	output = "<ul class=\"cf\">"
	# 	count = 6
	# 	$.each data, (i, item) ->
	# 		if i < count
	# 			events = data.Events[i]

	# 			output += "
	# 			<li><p>" + events.id + "</p></li>"

	# 	output += "</ul></div>"
	# 	$(".events-feed").html output
	# 	return


	$.ajax
  type: "GET"
  url: "http://release-ual.cs7.force.com/EventsFeed?filter=university-wide"
  dataType: "jsonp"
  success: (feed_data) ->
    console.log "the response is", feed_data
    $(".events-feed").append("<p>" + String(feed_data[0].name) + "</p>")
    $(".events-feed").append("<p>" + String(feed_data[0].programme) + "</p>")
    $(".events-feed").append("<p>" + String(feed_data[0].startdate) + "</p>")
    $(".events-feed").append("<img src='http://" + String(feed_data[0].image_url) + "' />")
    return

$(document).ready ->
		feed_data = {}
		# detect events feed component
		if $(".events-feed").length > 0
			$.each $(".events-feed"), ->
				getEventsFeed()

