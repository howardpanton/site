#
#    -------------------------------------------------------------
#        getNewsFeed()
#
#        Display feed of news from http://newsevents.arts.ac.uk/
#    -------------------------------------------------------------
#

@getNewsFeed = (college, tag, category, feed_id, count, width ) ->

	# set counter to 6 as default if blank parameter passed to the function
	if (count is "")
		count = 6
	else
		count = parseInt(count, 10)

	if college is "university-wide"
		feed_url = "http://newsevents.arts.ac.uk/api/get_recent_posts/?callback=?&tag=" + tag + "&category=" + category + "&count=" + count + "&include=title,url,attachments"
		blog_url = "http://newsevents.arts.ac.uk/"
	else
		feed_url = "http://blogs.arts.ac.uk/" + college + "/api/get_recent_posts/?callback=?&tag=" + tag + "&category=" + category + "&count=" + count + "&include=title,url,attachments"
		blog_url = "http://blogs.arts.ac.uk/" + college

	length = 100

	# see events_JSON
	if width is "content"
		img_size = 250
		img_width = 131
		img_height = 100
	else
		img_size = 600
		img_width = 456
		img_height = 200

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
						<div class="center-cropped">
							<a href="' + item.url + '">'

				if item.attachments.length
					output += '
								<img class="resrc" src="http://app.resrc.it/S=W' + img_size + '/C=W' + img_width + ',H' + img_height + '/' + item.attachments[0].url + '" alt="' + item.attachments[0].caption + '">'

				output+= '</a>
						</div>
					</div>

					<div class="title">
						<a href="' + item.url + '" title="' + item.title + '">' + short_title + '</a>
					</div>
				</li>'

		output += "</ul>
		<p class=\"view-all\"><a href=\"" + blog_url + "\" class=\"button-link\" title=\"\"><span class=\"hide-descriptive-text\">View all</span>View all</a></p></div>"
		$('.news-feed[data-feed-id="' + feed_id + '"]').append output

		# fire resrc.it after images have loaded
		resrc.resrcAll()

		return




$(document).ready ->
		# detect news feed component
		if $(".news-feed").length > 0
			$(".news-feed").each ->
				_this = $(this);
				getNewsFeed(_this.data('news-college'), _this.data('news-tag'), _this.data('news-category'), _this.data('feed-id'), _this.data('item-count'), _this.data('feed-width'))
