#
#    -------------------------------------------------------------
#        btnMenuDropdown()
#
#        detect dropdown menu button
#        (used in forms or in page for dropmenus)
#    -------------------------------------------------------------
#
btnMenuDropdown = ->
  if $(".dd-menu").length > 0
    $(".js-dd-menu").click (event) ->
      event.preventDefault()
      _d = $(this)
      _d_menu = _d.parent()
      if _d_menu.hasClass("active")
        _d_menu.find ".js-dd-menu-icon"
        _d_menu.find(".js-dd-menu-list").slideUp "fast", ->
          _d_menu.removeClass "active"

      else
        _d_menu.find ".js-dd-menu-icon"
        _d_menu.find(".js-dd-menu-list").slideDown "fast", ->
          _d_menu.addClass "active"
