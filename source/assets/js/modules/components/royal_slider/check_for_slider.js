/*
    -------------------------------------------------------------
        checkForSlider()

        detect slider component (royalSlider)
    -------------------------------------------------------------
*/

function checkForSlider() {

  if ($('.royalSlider').length > 0) {

    $.getScript('http://static.arts.ac.uk/assets/js/jquery.royalslider.min.js', function() {

      $.each($('.royalSlider'), function() {

        var _this = $(this);

        // get the individual slide width and height from the data-slider-item-width value in the HTML. If there's nothing set in the data-attribute, set the dimensions to sensible defaults
        var _itemWidth = (_this.data('slider-item-width') > 0) ? _this.data('slider-item-width') : 930;
        var _itemHeight = (_this.data('slider-item-height') > 0) ? _this.data('slider-item-height') : 465;
        var _itemAutoPlay = (_this.data('slider-auto-play') === true) ? _this.data('slider-auto-play') : false;

        _this.royalSlider({
          arrowsNav: true,
          fadeinLoadedSlide: false,
          arrowsNavAutoHide: false,
          controlNavigation: 'none',
          loop: true,
          autoScaleSlider: true,
          autoScaleSliderWidth: _itemWidth,
          autoScaleSliderHeight: _itemHeight,
          imageScalePadding: 0,
          globalCaption: true,
          keyboardNavEnabled: true,
          autoPlay: {
            enabled: _itemAutoPlay,
            pauseOnHover: true
          }
        });

        // var slider = _this.data('royalSlider');
        // slider.ev.on('rsAfterContentSet', function(e, object) {
        //   resrc.resrcAll();
        // });

      });



    });
  }


}
