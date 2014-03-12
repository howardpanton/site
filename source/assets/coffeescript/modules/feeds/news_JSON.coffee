#
#    -------------------------------------------------------------
#        getNewsFeed()
#
#        Display feed of news from http://newsevents.arts.ac.uk/
#    -------------------------------------------------------------
#
getNewsFeed = ->

  blogs_url = "http://blogs.arts.ac.uk/"
  api_call = "/api/get_recent_posts/?callback=?&count=5&include=title,url,attachments"

  lcf = blogs_url + "fashion" + api_call
  csm = blogs_url + "csm" + api_call

  $.getJSON lcf, (data) ->
    output = "<div class=\"feed-comp\">
                <ul class=\"cf\">"
    count = 5
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

    output += "</ul></div>"
    $("#news-feed").html output
    return

$(document).ready ->
    # detect events feed component
    if $("#news-feed").length > 0
      getNewsFeed()
