/*
    -------------------------------------------------------------
        resetSpinners()

        Check if there are any open accordion items,
        and reset the arrows to the closed position
    -------------------------------------------------------------
*/

function resetSpinners() {
  $( ".accordion-list-item" ).each(function (e) {
    var _li_item = $(this);
    if ( _li_item.hasClass('st-open') ) {
        _li_item.find('.st-arrow').rotate({animateTo:0, center: ["50%", "50%"] });
    }
  });
}
