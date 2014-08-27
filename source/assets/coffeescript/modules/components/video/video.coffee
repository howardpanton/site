#
#    -------------------------------------------------------------
#        checkForVideo()
#
#        detect and handle video (using mediaelement js)
#    -------------------------------------------------------------
#
checkForVideo = ->

		$.getScript "http://static.arts.ac.uk/assets/js/mediaelement-and-player.min.js", ->
			# pluginPath: 'http://www.arts.ac.uk/media/beta/beta-assets/plugins/'
			$("video").mediaelementplayer pluginPath: "http://static.arts.ac.uk/assets/swf/"


$(document).ready ->

		if $("video").length > 0
				checkForVideo()
