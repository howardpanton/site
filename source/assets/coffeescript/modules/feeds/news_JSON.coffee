#
#    -------------------------------------------------------------
#        getNewsFeed()
#
#        Display feed of news from http://newsevents.arts.ac.uk/
#    -------------------------------------------------------------
#

@getNewsFeed = (college, tag, category, feed_id, count ) ->

	# set counter to 6 as default if blank parameter passed to the function
	if (count is "")
		count = 6
	else
		count = parseInt(count, 10)

	feed_url = "http://blogs.arts.ac.uk/" + college + "/api/get_recent_posts/?callback=?&tag=" + tag + "&category=" + category + "&count=" + count + "&include=title,url,attachments"
	blog_url = "http://blogs.arts.ac.uk/" + college

	length = 60

	$.getJSON feed_url, (data) ->

		output = "<div class=\"feed-comp\">
								<ul class=\"cf no-bullet\">"
		$.each data.posts, (i, item) ->
			if i < count
				news_title = item.title
				if news_title.length > length
					short_title = trimTitle(news_title, length)
				else
					short_title = news_title

				output += '
				<li>
					<div class="feed-image">
						<div class="center-cropped" style="background-image: url(' + item.attachments[0].url + ')">
							<a href="' + item.url + '">
								<img src="' + item.attachments[0].url + '">
							</a>
						</div>
					</div>

					<div class="title">
						<a href="' + item.url + '" title="' + item.title + '">' + short_title + '</a>
					</div>
				</li>'

		output += "</ul>
		<p class=\"view-all\"><a href=\"" + blog_url + "\" class=\"button-link\" title=\"\"><span class=\"hide-descriptive-text\">View all</span>View all</a></p></div>"
		$('.news-feed[data-feed-id="' + feed_id + '"]').html output
		return


$(document).ready ->
		# detect events feed component
		if $(".news-feed").length > 0
			$.each $(".news-feed"), ->
				_this = $(this);
				getNewsFeed(_this.data('news-college'), _this.data('news-tag'), _this.data('news-category'), _this.data('feed-id'), _this.data('item-count'))
