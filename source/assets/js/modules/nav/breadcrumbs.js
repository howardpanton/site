/*
    -------------------------------------------------------------
        Breadcrumbs
    -------------------------------------------------------------
*/

function breadcrumbs() {
  jQuery(function() {
    $('.breadcrumbs').find('a').last().hide();
    return $('.browse-sc').find('.breadcrumbs').find('a:gt(4)').remove();
  });
}
