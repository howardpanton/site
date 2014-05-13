# # #
# #    -------------------------------------------------------------
# #        getEventsFeed()
# #
# #        Display feed of events from http://events.arts.ac.uk/
# #    -------------------------------------------------------------
# #

@getEventsFeed = (programme, type = "", feed_id = "", count = 6)->

	# check if parameters have values, if not, set variable to empty
	unless type
  	type = ""
	else
  	type = "&eventtype=" + type

  unless programme
  	programme = ""
	else
  	programme = "?programme=" + programme

  console.log "sending the following parameters to the feed: "
  console.log "programme: " + programme
  console.log "type: " + type
  console.log "feed_id: " + feed_id

  console.log "number of feed items to return: " + count


  # get HTML for one feed item
  getItemHTML = (item) ->
  	console.log ("the item returned is: " + item.name)
  	console.log ("the programme is: " + item.programme)
  	console.log ("the image url is: " + item.image_url)
  	console.log ("the start date is: " + item.startdate)

  # build html for feed
	outputfeedHTML = (feed_data) ->
		output = "<ul class=\"cf\">"

		$.each feed_data, (i, item) ->
			if i < count
				getItemHTML(item)
		return



	$.ajax
  type: "GET"
  url: "http://release-ual.cs7.force.com/EventsFeed" + programme  + type
  dataType: "jsonp"
  success: (feed_data) ->
  	outputfeedHTML(feed_data)
	return true


$(document).ready ->
		feed_data = {}
		# detect events feed component
		if $(".events-feed").length > 0
			$.each $(".events-feed"), ->
				getEventsFeed(programme = "university-wide", type = "", feed_id = "", count = 3)



# 		events = data.Events[i]

# 		output += "
# 		<li><p>" + events.id + "</p></li>"

# output += "</ul></div>"
# $(".events-feed").html output


# console.log "the response is", feed_data
# $(".events-feed").append("<p>" + String(feed_data[0].name) + "</p>")
# $(".events-feed").append("<p>" + String(feed_data[0].programme) + "</p>")
# $(".events-feed").append("<p>" + String(feed_data[0].startdate) + "</p>")
# $(".events-feed").append("<img src='http://" + String(feed_data[0].image_url) + "' />")
# return
