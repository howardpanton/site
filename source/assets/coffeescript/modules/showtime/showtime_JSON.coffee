#
#    -------------------------------------------------------------
#        showtimeJSONloader()
#
#        Search Filters (site search, course search)
#    -------------------------------------------------------------
#
showtimeJSONloader = ->

  # with a lightbox use-case, Magnific is a dependency. The .lightbox call further down shouldn't fire, since the Showtime lightbox only functions inside the getJSON.
  $.getScript "http://d27lwoqz7s24cy.cloudfront.net/assets/js/magnific-lightbox-ck.js", ->
    outputNode = $(".showtime-json")
    $.each outputNode, (i) ->
      _node = ""
      _node = $(this)
      feedUrl = _node.data("url")

      # set a feed limit (this only works for Profiles, for Student we have to set the limit via a counter)
      limit = _node.data("limit")
      $.getJSON feedUrl + "&limit=" + limit + "&callback=?", (data) ->
        string = ""
        media = ""
        studentName = ""
        profileUrl = ""
        counter = 0
        if data.data.Student # this is a single Showtime profile
          profileUrl = data.data.Student.Student.profileurl
          studentName = data.data.Student.Student.firstName + " " + data.data.Student.Student.lastName
          media = data.data.Student.Media
        # this is a group of objects in Showtime
        media = data.data.Profiles  if data.data.Profiles
        $.each media, (i, item) ->
          if counter < limit

            #if (item.type == 'video' || item.type == 'publication') {
            #  item.profileImg = 'http://app.resrc.it/http://beta.arts.ac.uk/media/beta/beta-colleges/beta-lcf/images/placeholder-lcf-580-4.jpg';
            #} else {
            profileImg = item.thumb.split("gallery")
            item.profileImg = profileImg[0] + "profile.jpg"
            item.zoomImg = profileImg[0] + "screen.jpg"

            #}
            if item.profileName #group
              profileUrl = "http://showtime.arts.ac.uk/" + item.profileName
              studentName = item.fullName
            string = "<li><a class=\"zoom no-border\" href= \"" + item.zoomImg + "\" title=\"" + studentName + "\" data-profile-url=\"" + profileUrl + "\" style=\"background-image: url(" + item.profileImg + ")\"></a></li>"
            _node.append string
            counter++
          else
            false

        # end each loop
        $(".zoom").magnificPopup
          type: "image"
          image:
            titleSrc: (item) ->
              item.el.attr("title") + " - <a class=\"no-border\" href=\"" + item.el.data("profile-url") + "\">View profile</a>"

          gallery:
            enabled: true
            navigateByImgClick: true
            preload: [0, 1] # Will preload 0 - before current, and 1 after the current image


$(document).ready ->
    if $(".showtime-json").length > 0
        showtimeJSONloader()

