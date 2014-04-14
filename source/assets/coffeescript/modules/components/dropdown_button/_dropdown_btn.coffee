#
#    -------------------------------------------------------------
#        ualDropdownBtn()
#
#        detect dropdown menu button
#        (used on course page sidebars, in forms or in page for dropmenus)
#    -------------------------------------------------------------
#

@ualDropdownBtn = ->
  if $(".dd-menu").length > 0
    $(".js-dd-menu").click (event) ->
      event.preventDefault()
      console.log "dropdown menu clicked"
      _d = $(this)
      _d_menu = _d.parent()
      if _d_menu.hasClass("active")
        _d_menu.find ".js-dd-menu-icon"
        _d_menu.find(".js-dd-menu-list").slideUp "fast", ->
          _d_menu.removeClass "active"
          return

      else
        _d_menu.find ".js-dd-menu-icon"
        _d_menu.find(".js-dd-menu-list").slideDown "fast", ->
          _d_menu.addClass "active"
          return

      return

  return
