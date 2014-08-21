// Generated by CoffeeScript 1.7.1
(function() {
  $(document).ready(function() {
    if (!$("html").hasClass("ie8")) {
      $(".megamenu").megaMenuCompleteSet({
        menu_effect: "open_close_slide",
        menu_click_outside: 1,
        menu_show_onload: 0,
        menu_responsive: 1
      });
      return true;
    }
  });

  $(document).keyup(function(e) {
    var focusedElem, _parent_menu_btn;
    focusedElem = $(document.activeElement);
    if (e.keyCode === 27) {
      _parent_menu_btn = focusedElem.closest(".menu-btn");
      if (_parent_menu_btn.hasClass("active")) {
        document.activeElement.blur();
        _parent_menu_btn.find("a.megamenu_drop").trigger('focus');
      }
      $(".menu-btn").removeClass("active");
      $(".dropdown_fullwidth").css("display", "none");
    }
    return true;
  });

}).call(this);
