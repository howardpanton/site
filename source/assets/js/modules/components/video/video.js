/*
		-------------------------------------------------------------
				checkForVideo()

				detect and handle video (using mediaelement js)
		-------------------------------------------------------------
*/

function checkForVideo() {
		if ($('video').length > 0) {

				$.getScript('https://raw.github.com/johndyer/mediaelement/master/build/mediaelement-and-player.js', function() {

						$('video').mediaelementplayer({
								// pluginPath: 'http://www.arts.ac.uk/media/beta/beta-assets/plugins/'
								pluginPath: 'http://static.arts.ac.uk/assets/swf/'
						});
				});

		}
}
