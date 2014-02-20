###
    -------------------------------------------------------------
        checkWindowSize() function
          Adds width classes to <body> tag.
          Used for tablet, desktop, mobile styling
    -------------------------------------------------------------
###

checkWindowSize = ->
  # get screen width
  width = $(window).width()

  # calc body class name to add based on screen width
  #new_body_class = width > 959 ? 'gDesktop' : (width > 599) ? 'gTablet' : (width < 600) ? 'gMobile' : ''

  switch width
      when (width > 959) then new_body_class = 'gDesktop'
      when (width > 599) then new_body_class = 'gTablet'
      when (width < 600) then new_body_class = 'gMobile'
      else new_body_class = ''

  # remove any existing body class and add the new_body_class
  $(document.body).removeClass('gDesktop gTablet gMobile').addClass(new_body_class)


$(document).ready ->
    checkWindowSize()

