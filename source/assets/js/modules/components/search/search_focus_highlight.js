/*
    -------------------------------------------------------------
        searchFocusHighlight()

        Focus highlighting for course search and site search input box.
        Adds a gray border around search inputs on focus
    -------------------------------------------------------------
*/

function searchFocusHighlight() {
    if ($('.search-input-wrap').length > 0) {

        $('#finder-search-input').focus(function () {
            $('#finder-search-input').parent().parent().addClass('search-gray-border');
        });

    }
}
