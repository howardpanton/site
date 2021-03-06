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

				$(".credits-btn").addClass "show"

				$(".show-credits").click (event) ->
						event.preventDefault()
						c = $(this)
						if c.hasClass("active")
								c.removeClass("active").attr "title", "Show image credits"
								$(".credits").fadeOut()
						else
								c.addClass("active").attr "title", "Hide image credits"
								$(".credits").fadeIn()

$(document).ready ->
		if $(".credits").length > 0
				imageCredits()
