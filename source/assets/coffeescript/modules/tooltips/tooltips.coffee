#
#    -------------------------------------------------------------
#      showTooltips (used on image credits button)
#      calls tooltipster plugin  (http://iamceege.github.io/tooltipster/)

#			 default example:

#			 $('.tooltip').tooltipster({
#           theme: 'tooltipster-noir',
#						position: 'top'
#      });
#    -------------------------------------------------------------
#



# show tooltip on image credits button
$(document).ready ->
		if $(".credits").length > 0
				$(".credits-btn").tooltipster({
						position: 'left',
						theme: 'tooltipster-light'
						trigger: 'hover',
						delay: 100,
						speed: 300,
						animation: "fade"
					})

		$("#tipp").tooltipster({
						position: 'left',
						trigger: 'hover',
						delay: 100,
						speed: 300,
						animation: "fade"
					})

