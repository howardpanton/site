/*
    -------------------------------------------------------------
        checkWindowSize() function
          Adds width classes to <body> tag.
          Used for tablet, desktop, mobile styling
    -------------------------------------------------------------
*/

(function() {
  var $, checkWindowSize;

  $ = jQuery;

  checkWindowSize = function() {
    var new_body_class, width, _ref, _ref1, _ref2;
    width = $(window).width();
    new_body_class = (_ref = width > 959) != null ? _ref : {
      'gDesktop': (_ref1 = width > 599) != null ? _ref1 : {
        'gTablet': (_ref2 = width < 600) != null ? _ref2 : {
          'gMobile': ''
        }
      }
    };
    return $(document.body).removeClass('gDesktop gTablet gMobile').addClass(new_body_class);
  };

}).call(this);
