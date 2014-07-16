#
#    -------------------------------------------------------------
#        getNewsFeed()
#
#        Display feed of news from http://newsevents.arts.ac.uk/
#    -------------------------------------------------------------
#

@getNewsFeed = (college, tag, category, feed_id, count, width, empty_message ) ->

	# set counter to 6 as default if blank parameter passed to the function
	if (count is "")
		count = 6
	else
		count = parseInt(count, 10)

	if college is "university-wide"
		path = "http://newsevents.arts.ac.uk"
	else
		path = "http://blogs.arts.ac.uk/" + college

	# for tag archive feeds
	if tag.length > 0
		feed_url = path + "/api/get_tag_posts/?callback=?&tag_slug=" + tag + "&count=" + count + "&include=title,url,attachments"
		view_all_url = path + "/tag/" + tag
	# for category archive feeds
	else if category.length > 0
		feed_url = path + "/api/get_category_posts/?callback=?&category_slug=" + category + "&count=" + count + "&include=title,url,attachments"
		view_all_url = path + "/category/" + category
	# for unspecific feeds
	else
		feed_url = path + "/api/get_recent_posts/?callback=?&count=" + count + "&include=title,url,attachments"
		view_all_url = path

	length = 100

	#console.log(feed_url)

	$.getJSON feed_url, (data) ->

		if data.status == "error"
			output = '<p>' + empty_message + '</p>'
		else
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
							<a href="' + item.url + '">'

					if item.attachments.length > 0
						output += '<span class="center-cropped resrc" style="background-image: url(http://app.resrc.it/s=w250/o=60/' + item.attachments[0].url + ');"></span>'
					else
						output += '<span class="center-cropped" style="background-image: url(http://d1r8ytjjwd02e2.cloudfront.net/placeholders/placeholder-' + college + '-580.jpg);"></span>'

					output += '
							</a>
						</div>

						<div class="title">
							<a href="' + item.url + '" title="' + item.title + '">' + short_title + '</a>
						</div>
					</li>'

			output += "</ul>
			<p class=\"view-all\"><a href=\"" + view_all_url + "\" class=\"button-link\" title=\"\"><span class=\"hide-descriptive-text\">View all</span>View all</a></p></div>"

		$('.news-feed[data-feed-id="' + feed_id + '"]').html output

		# fire resrc.it after images have loaded
		resrc.resrcAll()

		return


$(document).ready ->
		# detect news feed component
		if $(".news-feed").length > 0
			$(".news-feed").each ->
				_this = $(this);
				getNewsFeed(_this.data('news-college'), _this.data('news-tag'), _this.data('news-category'), _this.data('feed-id'), _this.data('item-count'), _this.data('feed-width'), _this.data('empty-message'))
