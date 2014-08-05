#
#    -------------------------------------------------------------
#        initSlider()
#
#        detect slider component (royalSlider)
#    -------------------------------------------------------------
#
initSlider = ->

    $.getScript "http://static.arts.ac.uk/assets/js/jquery.royalslider.min.js", ->
      $.each $(".royalSlider"), ->
        _this = $(this)

        # get the individual slide width and height from the data-slider-item-width value in the HTML. If there's nothing set in the data-attribute, set the dimensions to sensible defaults
        _itemWidth = (if (_this.data("slider-item-width") > 0) then _this.data("slider-item-width") else 930)
        _itemHeight = (if (_this.data("slider-item-height") > 0) then _this.data("slider-item-height") else 465)
        _itemAutoPlay = (if (_this.data("slider-auto-play") is true) then _this.data("slider-auto-play") else false)
        _this.royalSlider(
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
            delay: 3000
        ).data("royalSlider")

        _slider = _this.data('royalSlider');

        # Add tabindex to left and right slider btns for keyboard acessibility
        _slider.ev.on "rsBeforeAnimStart", (event) ->
		      $("div.rsArrowIcn").attr("tabindex", "0")
				  return true

				#if enter/return key is pressed on slider left or right buttons, trigger slider left or right
				$(document).keyup (e) ->

					focusedElem = $(document.activeElement)

					# if key is ENTER
					if(e.keyCode == 13)

						if focusedElem.hasClass("rsArrowIcn")
							_p = focusedElem.parent()

							#get current instance of royalslider
							_rSlider = _p.closest(".royalSlider").data("royalSlider")

							#move slides left or right
							if _p.hasClass("rsArrowRight")
								_rSlider.next()
							if _p.hasClass("rsArrowLeft")
								_rSlider.prev()
					return true



$(document).ready ->
    if $(".royalSlider").length > 0
        initSlider()

