#
#    -------------------------------------------------------------
#        initSlider()
#
#        detect slider component (royalSlider)
#    -------------------------------------------------------------
#
initSlider = ->

    $.getScript "http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.royalslider.min.js", ->
      $.each $(".royalSlider"), ->
        _this = $(this)

        # get the individual slide width and height from the data-slider-item-width value in the HTML. If there's nothing set in the data-attribute, set the dimensions to sensible defaults
        _itemWidth = (if (_this.data("slider-item-width") > 0) then _this.data("slider-item-width") else 930)
        _itemHeight = (if (_this.data("slider-item-height") > 0) then _this.data("slider-item-height") else 465)
        _itemAutoPlay = (if (_this.data("slider-auto-play") is true) then _this.data("slider-auto-play") else false)
        _this.royalSlider
          arrowsNav: true
          fadeinLoadedSlide: false
          arrowsNavAutoHide: false
          controlNavigation: "none"
          loop: true
          autoScaleSlider: true
          autoScaleSliderWidth: _itemWidth
          autoScaleSliderHeight: _itemHeight
          imageScalePadding: 0
          globalCaption: true
          keyboardNavEnabled: true
          autoPlay:
            enabled: _itemAutoPlay
            pauseOnHover: true


$(document).ready ->
    if $(".royalSlider").length > 0
        initSlider()




# var slider = _this.data('royalSlider');
# slider.ev.on('rsAfterContentSet', function(e, object) {
#   resrc.resrcAll();
# });
