###
    -------------------------------------------------------------
        .back-to-top
          Scroll to the top of the page
          when a link with .back-to-top class clicked

          On desktop the button will fade in when the user
          scrolls down the page
    -------------------------------------------------------------
###

# On Desktop - fade in back-to-top button when user scrolls down the page
# checkScroll = () ->
#   if($("body").hasClass("gDesktop"))
#     if ($(this).scrollTop() > 450)
#       $('.back-to-top').fadeIn(200)
#     else
#       $('.back-to-top').fadeOut(200)

# $(window).scroll(checkScroll())

# # scroll to top of page when button is clicked
# $(".back-to-top").click(e) ->
#   e.preventDefault()
#   $("html, body").animate({scrollTop: 0}, 300)

backToTop = ->
    checkScroll() ->
        if $("body").hasClass("gDesktop")
            if $(this).scrollTop() > 450
                $(".back-to-top").fadeIn 200
            else
                $(".back-to-top").fadeOut 200

    $(window).scroll checkScroll()

    $("back-to-top").click (event) ->
        event.preventDefault()
        $("html, body").animate
          scrollTop: 0
        , 300

$(document).ready ->
    backToTop()

