/*
    -------------------------------------------------------------
        checkForCarousel()

        detect slider component (bxSlider)
    -------------------------------------------------------------
*/

function checkForCarousel() {

    if ($('.js-carousel').length > 0) {

    $.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.bxslider.min.js', function() {

      $.each($('.js-carousel'), function() {

        var _this = $(this);
        var _wrapper = _this.closest('.bx-wrapper'); // the .bx-wrapper container div

        // get the individual slide width from the data-slider-item-width value in the HTML. If there's nothing set in the data-attribute, set the width to 0 - i.e. max-width
        var _itemWidth = (_this.data('carousel-item-width') > 0) ? _this.data('carousel-item-width') : 0;
        // set the minimum number of slides before it starts to be responsive
        var _itemMinSlides = (_this.data('carousel-min-slides') > 0) ? _this.data('carousel-min-slides') : 0;
        // get the margin between slides from the data-slider-item-margin value in the HTML. If there's nothing set in the data-attribute, set the margin to 0
        var _itemMargin = (_this.data('carousel-item-margin') > 0) ? _this.data('carousel-item-margin') : 0;
        // move slides by x each time user hits next or previous. Defaults to 1
        var _moveSlides = = (_this.data('carousel-move-slides') > 0) ? _this.data('carousel-move-slides') : 1;
        // slider instances always show next/prev controls, unless data-controls is false
        var _controlsOpt = true;
        _controlsOpt = _this.data('controls');
        // slider instances do not show a pager, unless data-pager is true
        var _pagerOpt = (_this.data('pager')) ? _this.data('pager') : false;

        _this.bxSlider({
          slideWidth: _itemWidth,
          minSlides: _itemMinSlides,
          maxSlides: 10,
          slideMargin: _itemMargin,
          moveSlides: _moveSlides,
          controls: _controlsOpt,
          captions: true,
          pager: _pagerOpt,
          onSliderLoad: function(currentIndex) {
            if (_this.data('counter')) {
              $(_this).closest('.bx-wrapper').find('.bx-controls').prepend('<div class="bx-counter"><span class="bx-index">' + (currentIndex+1) + '</span>/<span class="bx-total">' + _this.getSlideCount() + '</span></div>');
            }
          },
          onSlideAfter: function($slideElement, oldIndex, newIndex) {
            if (_this.data('counter')) {
              $(_this).closest('.bx-wrapper').find('.bx-index').text(newIndex+1);
            }
          }
        });
      });
    });

  }
}
