# #
# #    -------------------------------------------------------------
# #        getEventsFeed()
# #
# #        Display feed of events from http://events.arts.ac.uk/
# #    -------------------------------------------------------------
# #

@getEventsFeed = (programme = "University-wide", type = "", feed_id = "", count = 6)->

	# set counter to 6 as default if blank parameter passed to the function
	if (count is "")
		count = 6
	else
		count = parseInt(count, 10)

	# check if parameters have values, or if set to "all". If not, set variable to empty
	unless (programme is "")
  	programme = ("?programme=" + programme)
  else
  	#set to university wide by default
  	programme = "?programme=University-wide"

  # if (type is not "" and (type is not "all"))
  unless ((type is "") or (type is "all"))
  	type = ("&eventtype=" + type)
  else
  	type = ""




  console.log "Output for Feed ID: " + feed_id
  console.log "type is:" + type
  console.log "count is: " + count
  console.log "programme is: " + programme


  #max number of characters for event title
  eventsTitleLength = 100

  # get HTML for one feed item
  getItemHTML = (item) ->

  	itemHTML = ""

  	event_title = item.name

  	# trim title to max 100characters
  	event_title = trimTitle(event_title, eventsTitleLength)

  	#format the date
  	ev_date = item.startdate

  	parts = ev_date.split("-", 3)

  	ev_year = parts[0]

  	# get english month name from date
  	ev_month = getMonthName(parts[1], "short")

  	ev_day = parts[2]

  	# re-order the date and save it as a string
  	ev_date = ev_day + " " + ev_month + " " + ev_year

  	# replace "_" or "-" with " " for event type
  	ev_type = item.type.replace("_", " ");

  	# build HTML code for item and return itemHTML variable
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
								<a href=\"" + item.event_url + "\" tite=\"" + item.name + "\">" + event_title + "
								<p class=\"date\">" + ev_date + ", " + ev_type + "</p></a>
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
