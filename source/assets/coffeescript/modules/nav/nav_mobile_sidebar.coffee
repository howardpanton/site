#
#    -------------------------------------------------------------
#      buildMobileSidebar()
#
#      Creates a mobile and tablet version of the left sidebar menu
#    -------------------------------------------------------------
#

buildMobileSidebar = ->
  _sb_lth = $(".sidebar").length
  _has_heading = $(".sidebar").find(".menu-heading").length

  #&& _has_heading > 0
  if _sb_lth > 0
    _no_of_li_items = $(".sidebar li").size()

    # If there's more than one item in the left sidebar, then build the mobile sidebar
    if _no_of_li_items > 1
      _menuHtml = $(".sidebar").html()
      _sideBarTitle = $(".sidebar li").first()
      _mobMenuButton = "<div class='mob-sb-dd-title'>" + _sideBarTitle.text() + "</div>" + "<a href=\"#\" class=\"show-mob-sidebar\"></a>"
      _mobMenuContent = undefined
      if _has_heading > 0
        _mobMenuContent = _mobMenuButton + _menuHtml
      else
        _mobMenuContent = _menuHtml

      # create mobile sidebar div and add it to the main content div
      $("<div id=\"mobile-sidebar\" class=\"mobile-sidebar d-hide\"></div>").prependTo ".content"

      # populate the mobile menu with the same content as the desktop sidebar nav & add menu button
      $("#mobile-sidebar").html _mobMenuContent
      $(".show-mob-sidebar").click (e) ->
        e.preventDefault()
        _clicked = $(this)
        if _clicked.hasClass("active")
          _clicked.closest($("#mobile-sidebar")).find($("ul")).slideUp()
          _clicked.removeClass "active"
        else
          _clicked.closest($("#mobile-sidebar")).find($("ul")).slideDown()

          # update the menu button and set class to active
          _clicked.addClass "active"

      # check if first item is "In This Section" which shouldn't be added as a link to the mob sidebar
      if _sideBarTitle.text().toLowerCase() is "in this section"

        # hide "In This Section" in the sidebar dropdown
        $("#mobile-sidebar li").first().remove()

      # if not, it must be a college - so replace text with "college homepage"
      else
        $("#mobile-sidebar li a").first().text "College Homepage"

$(document).ready ->

    buildMobileSidebar()

