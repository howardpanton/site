/*
    -------------------------------------------------------------
        checkForAccordion()

        Load accordion scripts if there is an accordion on the page
    -------------------------------------------------------------
*/

function checkForAccordion() {

    if ($('.accordion').length > 0) {

        $.when(
            $.getScript( "http://static.arts.ac.uk/assets/js/jquery.accordion-ck.js" ),
            $.getScript( "http://static.arts.ac.uk/assets/js/jquery.easing.1.3-ck.js" ),
            $.getScript( "http://static.arts.ac.uk/assets/js/jquery-rotate-ck.js" ),
            $.Deferred(function( deferred ){
                $( deferred.resolve );
            })
        ).done(function(){

            $('#st-accordion').accordion({
                oneOpenedItem: true
            });

        });

        $(".accordion-list-anchor").on("click", ".size-h4", function(event){
            event.preventDefault();
            var circle = ($(this).next('.st-arrow'));
            var accordion = ($(this).parent().parent());
            var elem = ($(this).parent().next('.st-content'));
                  resetSpinners();
                  if (!elem.is(':visible'))  {
                    circle.rotate({animateTo:135});
                   } else {
                    circle.rotate({animateTo:0, center: ["50%", "50%"] });
                  }
        });

        $(".st-arrow").on("click", function(e){
          e.preventDefault();
          resetSpinners();
          var _icon = $(this);
          var _st = $(this).parent().parent();

          if (!_st.hasClass('st-open'))  {
            _icon.rotate({animateTo:135});
          } else {
            _icon.rotate({animateTo:0, center: ["50%", "50%"] });
          }

        });
    }
}
