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



  #max number of characters for event title
  eventsTitleLength = 100

  # get HTML for one feed item
  getItemHTML = (item) ->

  	itemHTML = ""


  	event_title = item.name

  	event_title = trimTitle(event_title, eventsTitleLength)

  	#format the date


  	return itemHTML += "
  							<li>
  								<div class=\"single-feed-container a\">
										<a href=\"" + item.event_url + "\">

											<div class=\"feed-image\">
												<div class=\"center-cropped\" style=\"background-image: url(" + item.image_url + ")\">
													<img src=\"" + item.image_url + "\">
												</div>
											</div>

											<div class=\"title\">
												<a href=\"" + item.event_url + "\" tite=\"" + item.name + "\">" + event_title + "</a>
												<p class=\"date\">" + item.startdate + "</p>
											</div>

										</a>
									</div>
								</li>"



  # build html for feed component
	outputfeedHTML = (feed_data) ->
		output = "<div class=\"feed-comp\">
								<ul class=\"cf\">"

		$.each feed_data, (i, item) ->
			if i < count
				output += getItemHTML(item)

		output += "</ul></div>"

		console.log "the value of output variable is: " + output
		$(".events-feed-" + feed_id).html output
		return


	$.ajax
  type: "GET"
  url: "http://ual.force.com/eventsfeed" + programme  + type
  dataType: "jsonp"
  success: (feed_data) ->
  	outputfeedHTML(feed_data)
	return true


$(document).ready ->
		feed_data = {}
		# detect events feed component
		if $(".events-feed").length > 0
			$.each $(".events-feed"), ->




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
