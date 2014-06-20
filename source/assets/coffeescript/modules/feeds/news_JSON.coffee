#
#    -------------------------------------------------------------
#        getNewsFeed()
#
#        Display feed of news from http://newsevents.arts.ac.uk/
#    -------------------------------------------------------------
#

@getNewsFeed = (college, feed_id, count ) ->

	# set counter to 5 as default if blank parameter passed to the function
	if (count is "")
		count = 5
	else
		count = parseInt(count, 10)

	feed_url = "http://blogs.arts.ac.uk/" + college + "/api/get_recent_posts/?callback=?&count=" + count + "&include=title,url,attachments"
	blog_url = "http://blogs.arts.ac.uk/" + college
	console.log(feed_url);

	$.getJSON feed_url, (data) ->

		output = "<div class=\"feed-comp\">
								<ul class=\"cf no-bullet\">"
		$.each data.posts, (i, item) ->

			news = data.posts[i]
			length = 60
			title = news.title
			if title.length > length
				short_title = title.substring(0,length) + "..."
			else
				short_title = title

			output += "
			<li>
				<div class=\"feed-image\">
					<div class=\"center-cropped\" style=\"background-image: url(" + news.attachments[0].url + ")\">
						<img src=\"" + news.attachments[0].url + "\">
					</div>
				</div>

				<div class=\"title\">
					<a href=\"" + news.url + "\" tite=\"" + news.title + "\">" + short_title + "</a>
				</div>
			</li>"

		output += "</ul>
		<p class=\"view-all\"><a href=\"" + blog_url + "\" class=\"button-link\" title=\"\"><span class=\"hide-descriptive-text\">View all</span>View all</a></p></div>"
		$('.news-feed[data-feed-id="' + feed_id + '"]').html output
		return


$(document).ready ->
		# detect events feed component
		if $(".news-feed").length > 0
			$.each $(".news-feed"), ->
				_this = $(this);
				getNewsFeed(_this.data('news-college'), _this.data('feed-id'), _this.data('item-count'))
