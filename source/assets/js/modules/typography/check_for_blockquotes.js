/*
    -------------------------------------------------------------
      checkForBlockquotes()

      insert a span at the beginning of any blockquotes
      to show large blockquote img (sprite)
    -------------------------------------------------------------
*/

function checkForBlockquotes() {

  // check for regular blockquotes on the page
  if ($('blockquote').length > 0 ) {

    $('blockquote').each(function() {
      $(this).prepend('<span></span>');
    });
  }

  // check for large blockquotes on the page
  if ($('.pull-quote').length > 0) {

    $('.pull-quote').each(function() {
      $(this).prepend('<span></span>');
    });
  }
}
