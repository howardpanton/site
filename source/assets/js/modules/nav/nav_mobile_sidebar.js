// Generated by CoffeeScript 1.7.1
(function() {
  var buildMobileSidebar;

  buildMobileSidebar = function() {
    var _has_heading, _menuHtml, _mobMenuButton, _mobMenuContent, _no_of_li_items, _sb_lth, _sideBarTitle;
    _sb_lth = $(".sidebar").length;
    _has_heading = $(".sidebar").find(".menu-heading").length;
    if (_sb_lth > 0) {
      _no_of_li_items = $(".sidebar li").size();
      if (_no_of_li_items > 1) {
        _menuHtml = $(".sidebar").html();
        _sideBarTitle = $(".sidebar li").first();
        _mobMenuButton = "<div class='mob-sb-dd-title'>" + _sideBarTitle.text() + "</div>" + "<a href=\"#\" class=\"show-mob-sidebar\"></a>";
        _mobMenuContent = void 0;
        if (_has_heading > 0) {
          _mobMenuContent = _mobMenuButton + _menuHtml;
        } else {
          _mobMenuContent = _menuHtml;
        }
        $(".content").first().prepend("<div id=\"mobile-sidebar\" class=\"mobile-sidebar d-hide\"></div>");
        $("#mobile-sidebar").html(_mobMenuContent);
        $(".show-mob-sidebar").click(function(e) {
          var _clicked;
          e.preventDefault();
          _clicked = $(this);
          if (_clicked.hasClass("active")) {
            _clicked.closest($("#mobile-sidebar")).find($("ul")).slideUp();
            return _clicked.removeClass("active");
          } else {
            _clicked.closest($("#mobile-sidebar")).find($("ul")).slideDown();
            return _clicked.addClass("active");
          }
        });
        if (_sideBarTitle.text().toLowerCase() === "in this section") {
          return $("#mobile-sidebar li").first().remove();
        } else {
          if ($("#mobile-sidebar li a").first().text() === $(".mob-sb-dd-title").text()) {
            return $("#mobile-sidebar li a").first().text("College Homepage");
          }
        }
      }
    }
  };

  $(document).ready(function() {
    return buildMobileSidebar();
  });

}).call(this);
