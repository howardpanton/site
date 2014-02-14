/*
    -------------------------------------------------------------
        btnMenuDropdown()

        detect dropdown menu button
        (used in forms or in page for dropmenus)
    -------------------------------------------------------------
*/

function btnMenuDropdown() {

    if ($('.dd-menu').length > 0) {

        $(".js-dd-menu").click(function (event){
           event.preventDefault();
           var _d = $(this);
           var _d_menu = _d.parent();

           if (_d_menu.hasClass('active')) {
              _d_menu.find('.js-dd-menu-icon');
              _d_menu.find('.js-dd-menu-list').slideUp('fast', function() {
                _d_menu.removeClass('active');
             });
           }
           else {
              _d_menu.find('.js-dd-menu-icon');
              _d_menu.find('.js-dd-menu-list').slideDown('fast', function() {
                _d_menu.addClass('active');
             });
           }
        });
    }
}
