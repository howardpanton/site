#
#    -------------------------------------------------------------
#      imageCredits()
#
#      Show image credits button
#      fixed to the right of the screen (on desktop only)
#    -------------------------------------------------------------
#

@imageCredits = ->

		#only show credits on desktop
		if $("html").hasClass("desktop")

				$(".credits-btn").addClass "show "

				$(".show-credits").click (event) ->
						event.preventDefault()
						c = $(this)
						if c.hasClass("active")
								c.removeClass("active").attr "title", "Show image credits"

								# update the tooltip message
								$("#image-credits-toggle").tooltipster "hide", ->
								  @tooltipster "content", "Show image credits"
								  # fade out the image credits which appear over the images
								  $(".credits").fadeOut()
								  return true


						else
								c.addClass("active").attr "title", "Hide image credits"

								$("#image-credits-toggle").tooltipster "hide", ->
								  @tooltipster "content", "Hide image credits"
								  # fade in the image credits
								  $(".credits").fadeIn()
								  return true


$(document).ready ->
		if $(".credits").length > 0
				imageCredits()
