###
    -------------------------------------------------------------
        .back-to-top
          Scroll to the top of the page
          when a link with .back-to-top class clicked

          On desktop the button will fade in when the user
          scrolls down the page
    -------------------------------------------------------------
###


checkScrollPos = ->
  if $("body").hasClass("gDesktop")
    if $(this).scrollTop() > 450
      $(".back-to-top").fadeIn 200
    else
      $(".back-to-top").fadeOut 200
backToTop = ->
  $(window).scroll checkScrollPos()
  $("back-to-top").click (event) ->
    event.preventDefault()
    $("html, body").animate
      scrollTop: 0
    , 300


$(document).ready ->
    backToTop()

