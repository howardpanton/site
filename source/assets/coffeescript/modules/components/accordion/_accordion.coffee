###
		-------------------------------------------------------------
				initAccordion()
				Load accordion script and handle clicks
				Updated Howard Panton : 15th August 2014
		-------------------------------------------------------------
###

initAccordion = ->

	$ ($) ->
		allAccordions = $(".accordion .accordion__content")
		allAccordionItems = $(".accordion .accordion__heading")
		$(".accordion__heading").click ->
			console.log($(this))
			if $(this).hasClass("open")
				$(this).removeClass "open"
				$(this).parent().next().slideUp "fast", "linear"
			else
				allAccordions.slideUp "fast", "linear"
				allAccordionItems.removeClass "open"
				$(this).addClass "open"
				$(this).parent().next().slideDown "fast", ->
					$("html:not(:animated), body:not(:animated)").animate
						scrollTop: $(this).offset().top - 60
					, "slow"
					return
				false
			return
		return

	$ ($) ->
		allAccordions = $(".accordion .accordion__content")
		allAccordionItems = $(".accordion .accordion__heading")
		$(".accordion__heading").keyup (e) ->
			console.log($(this))
			if(e.keyCode == 13)
				if $(this).hasClass("open")
					$(this).removeClass "open"
					$(this).parent().next().slideUp "fast", "linear"
				else
					allAccordions.slideUp "fast", "linear"
					allAccordionItems.removeClass "open"
					$(this).addClass "open"
					$(this).parent().next().slideDown "fast", ->
						$("html:not(:animated), body:not(:animated)").animate
							scrollTop: $(this).offset().top - 60
						, "slow"
						return
					false
				return
			return

$(document).ready ->
		if $(".accordion").length > 0
			initAccordion()




