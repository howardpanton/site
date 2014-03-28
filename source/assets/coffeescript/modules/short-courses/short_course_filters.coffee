#
#    -------------------------------------------------------------
#        shortCourseFilters()
#
#        filtrify and jPages set up for short courses section
#
#    -------------------------------------------------------------
#
# shortCourseFilters = ->

#     $.when($.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/filtrify.min.js"), $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jPages.min.js"), $.Deferred((deferred) ->
#       $ deferred.resolve
#     )).done ->
#         $ ->
#             setPagination = ->
#                 pagination.jPages
#                     containerID: "container"
#                     perPage: 24
#                     midRange: 1
#                     previous: "←"
#                     next: "→"
#                     direction: "auto"
#                     animation: "fadeInUp"

#             destroyPagination = ->
#                 pagination.jPages "destroy"
#                 container = $("#container")
#                 pagination = $("#pagination")

#             setPagination()

#             $.filtrify "container", "placeHolder",
#                 block: "data-original"
#                 callback: ->
#                     destroyPagination()
#                     setPagination()

#     $("#placeHolder").prependTo ".content"  unless $("html").hasClass("desktop")




shortCourseFilters = ->
	if $("#container").length > 0
		$.when($.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/filtrify.min.js"), $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jPages.min.js"), $.Deferred((deferred) ->
			$ deferred.resolve
			return
		)).done ->
			$ ->
				setPagination = ->
					pagination.jPages
						containerID: "container"
						perPage: 24
						midRange: 1
						previous: "←"
						next: "→"
						direction: "auto"
						animation: "fadeInUp"

					return
				destroyPagination = ->
					pagination.jPages "destroy"
					return
				container = $("#container")
				pagination = $("#pagination")
				setPagination()
				$.filtrify "container", "placeHolder",
					block: "data-original"
					callback: ->
						destroyPagination()
						setPagination()
						return

				return

			return

		$("#placeHolder").prependTo ".content"  unless $("html").hasClass("desktop")
	return



$(document).ready ->
		if $("#container").length > 0
				shortCourseFilters()
