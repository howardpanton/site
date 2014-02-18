#
#    -------------------------------------------------------------
#        initCarousel()
#
#        initialise carousel component (bxSlider)
#    -------------------------------------------------------------
#
initCarousel = ->

    $.getScript "http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.bxslider.min.js", ->
        $.each $(".js-carousel"), ->
            _this = $(this)
            _wrapper = _this.closest(".bx-wrapper") # the .bx-wrapper container div

            # get the individual slide width from the data-slider-item-width value in the HTML. If there's nothing set in the data-attribute, set the width to 0 - i.e. max-width
            _itemWidth = (if (_this.data("carousel-item-width") > 0) then _this.data("carousel-item-width") else 0)

            # set the minimum number of slides before it starts to be responsive
            _itemMinSlides = (if (_this.data("carousel-min-slides") > 0) then _this.data("carousel-min-slides") else 0)

            # get the margin between slides from the data-slider-item-margin value in the HTML. If there's nothing set in the data-attribute, set the margin to 0
            _itemMargin = (if (_this.data("carousel-item-margin") > 0) then _this.data("carousel-item-margin") else 0)

            # slider instances always show next/prev controls, unless data-controls is false
            _controlsOpt = true
            _controlsOpt = _this.data("controls")

            # slider instances do not show a pager, unless data-pager is true
            _pagerOpt = (if (_this.data("pager")) then _this.data("pager") else false)
            _this.bxSlider
              slideWidth: _itemWidth
              minSlides: _itemMinSlides
              maxSlides: 10
              slideMargin: _itemMargin
              moveSlides: 1
              controls: _controlsOpt
              captions: true
              pager: _pagerOpt
              onSliderLoad: (currentIndex) ->
                $(_this).closest(".bx-wrapper").find(".bx-controls").prepend "<div class=\"bx-counter\"><span class=\"bx-index\">" + (currentIndex + 1) + "</span>/<span class=\"bx-total\">" + _this.getSlideCount() + "</span></div>"  if _this.data("counter")

              onSlideAfter: ($slideElement, oldIndex, newIndex) ->
                $(_this).closest(".bx-wrapper").find(".bx-index").text newIndex + 1  if _this.data("counter")


$(document).ready ->
    if $(".js-carousel").length > 0
        initSlider()
