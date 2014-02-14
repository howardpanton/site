/*
    -------------------------------------------------------------
        Format date (crop long date & time into shorter date)
    -------------------------------------------------------------
*/

(function() {
  $(".date").each(function(i, element) {
    var str;
    str = $(this).text();
    if (str.indexOf(",") !== -1) {
      return $(this).text(str.substring(5, 16));
    }
  });

}).call(this);
