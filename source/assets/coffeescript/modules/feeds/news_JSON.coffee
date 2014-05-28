#
#    -------------------------------------------------------------
#        getNewsFeed()
#
#        Display feed of news from http://newsevents.arts.ac.uk/
#    -------------------------------------------------------------
#

@getNewsFeed = (college, feed_id ) ->

	feed_url = "http://blogs.arts.ac.uk/" + college + "/api/get_recent_posts/?callback=?&count=6&include=title,url,attachments"
	blog_url = "http://blogs.arts.ac.uk/" + college

	$.getJSON feed_url, (data) ->
		output = "<div class=\"feed-comp\">
								<ul class=\"cf\">"
		count = 6
		$.each data.posts, (i, item) ->
			if i < count
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
		$(".news-feed-" + feed_id).html output
		return

# $(document).ready ->
# 		# detect events feed component
# 		college = "fashion"
# 		feed_id = 1
# 		college1 = "chelsea"
# 		feed_id1 = 2
# 		if $(".news-feed-" + feed_id).length > 0
# 			$.each $(".news-feed-" + feed_id), ->
# 				getNewsFeed(college, feed_id)
# 				getNewsFeed(college1, feed_id1)

# $(document).ready ->
# 		# detect events feed component
# 		if $(".news-feed").length > 0
# 			$.each $(".news-feed"), ->
# 				getNewsFeed()
