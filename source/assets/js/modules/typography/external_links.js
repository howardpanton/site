/*
    -------------------------------------------------------------
        externalLinks()

        creates custom :external selector

        Adds 'external' class to all external links
    -------------------------------------------------------------
*/

function externalLinks() {

  // create :external selector
  jQuery.expr[':'].external = function(obj){
    return (obj.hostname != location.hostname);
  };

  // Add external class to links
  $('.l-content a:external.button-link, aside a:external').addClass('external').each(function() {
    $(this).attr("title", $(this).attr("title") + "(external link)");
  });

}
