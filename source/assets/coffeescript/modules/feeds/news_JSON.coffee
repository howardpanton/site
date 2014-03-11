#
#    -------------------------------------------------------------
#        getNewsFeed()
#
#        Display feed of news from http://newsevents.arts.ac.uk/
#    -------------------------------------------------------------
#
getNewsFeed = ->

  $.getJSON "http://newsevents.arts.ac.uk/api/get_recent_posts/?callback=?", (data) ->
    output = "<ul>"
    count = 5
    $.each data.posts, (i, item) ->
      if i < count
        news = data.posts[i]
        output += "<li><img src=\"" + news.attachments + "\"> <a href=\"" + news.url + "\" tite=\"" + news.title + "\">" + news.title + "</a></li>"


    output += "</ul>"
    $("#news-feed").html output
    return

$(document).ready ->
    # detect events feed component
    if $("#news-feed").length > 0
      getNewsFeed()
