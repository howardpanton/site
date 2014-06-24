# #
# #    -------------------------------------------------------------
# #        getEventsFeed()
# #
# #        Display feed of events from http://events.arts.ac.uk/
# #    -------------------------------------------------------------
# #

@getEventsFeed = (programme = "University-wide", type = "", feed_id = "", count = 6, keyword = "")->

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

	# use keyword if provided
	unless (keyword is "")
		keyword = ("&keyword=" + keyword)
	else
		keyword is ""

	# uncomment these lines to debug the feed in the console
	# console.log "Output for Feed ID: " + feed_id
	# console.log "type is:" + type
	# console.log "count is: " + count
	# console.log "programme is: " + programme


	#max number of characters for event title
	length = 100

	# get HTML for one feed item
	getItemHTML = (item) ->

		itemHTML = ""

		event_title = item.name

		# trim title to max 100characters
		# short_title = event_title.substring(0,length) + "..."
		short_title = trimTitle(event_title, length)

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
		return itemHTML += '
				<li>
					<div class="single-feed-container">

							<div class="feed-image">
								<div class="center-cropped" style="background-image: url("' + item.image_url + '")">
									<a href="' + item.event_url + '">
										<img src="' + item.image_url + '">
									</a>
								</div>
							</div>

							<div class="title">
								<a href="' + item.event_url + '" title="' + item.name + '">' + short_title + '
									<p class="date">' + ev_date + ', ' + ev_type + '</p>
								</a>
							</div>

					</div>
				</li>'



	# build html for feed component
	outputfeedHTML = (data) ->

		output = "<div class=\"feed-comp\">
								<ul class=\"cf no-bullet\">"

		$.each data, (i, item) ->
			if i < count
				output += getItemHTML(item)

		output += "</ul></div>"
		$('.events-feed[data-feed-id="' + feed_id + '"]').html output
		return

	$.ajax
		type: "GET"
		url: "http://events.arts.ac.uk/EventsFeed" + programme + type + keyword + "&callback=?"
		dataType: "jsonp"
		success: (data) ->
			outputfeedHTML(data)
			return



$(document).ready ->

	# detect events feed component
	if $(".events-feed").length > 0
		$.each $(".events-feed"), ->
			_this = $(this);
			getEventsFeed(_this.data('event-programme'), _this.data('event-type'), _this.data('feed-id'), _this.data('item-count'), _this.data('event-keyword'));



