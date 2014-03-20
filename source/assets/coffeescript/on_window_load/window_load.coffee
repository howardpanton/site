#
#    -------------------------------------------------------------
#        $(window).load() function
#
#        script runs once the content on the page has been
#        loaded
#    -------------------------------------------------------------
#

window.loadMap = ->

		gJson = []

		# create map as per mapConfig object properties set in view
		initialLocation = new google.maps.LatLng(mapConfig.initLat, mapConfig.initLng)

		mapOptions =
				zoom: mapConfig.zoom,
				center: initialLocation

		mapDiv = document.getElementById("map-canvas")

		map = new google.maps.Map(mapDiv, mapOptions)


		# create the InfoWindow object outside of addMarker() to ensure only one window is open at once
		infoWindow = new google.maps.InfoWindow(
				content: ""
				maxWidth: 400
		)



		# -- Show Transit & Bicycling Layers --
		# These will display if options are ticked inside the map-component in t4
		# The t4 component will add class names to the #map-canvas div which we then check for below
		if hasClass(mapDiv, "--with-transit-layer")
				transitLayer = new google.maps.TransitLayer()
				transitLayer.setMap map

		if hasClass(mapDiv, "--with-bicycling-layer")
			bikeLayer = new google.maps.BicyclingLayer()
			bikeLayer.setMap map


		# Add Markers to the map from JSON data
		# loop through array of marker data
		for i of json
				addMarker json[i], map, infoWindow

		return
# loadMap

addMarker = (data, map, infoWindow) ->

		# Create the marker
		marker = new google.maps.Marker(
				position: new google.maps.LatLng(data.lat, data.lng)
				map: map
				title: data.name
		)

		# push the new marker objects into arrays
		# gJson.push marker  if data is json[i]

		# build the window contents
		contentString = "<h3>" + data.name + "</h3>" + "<p>" + data.content + "</p>"
		google.maps.event.addListener marker, "click", ->
				infoWindow.open map, marker
				infoWindow.setContent contentString
				return

		return
# addMarker

loadMapsScript = ->
		script = document.createElement("script")
		script.type = "text/javascript"
		script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&" + "callback=loadMap"
		document.body.appendChild script
		return



$(window).load ->

		# run fitHeights() on page elements
		$(".related-content ul li").fitHeights()  if $(".related-content").length > 0
		$(".highlight-box-3 ul li").fitHeights()  if $(".highlight-box-3").length > 0

		if $("body").is(".chelsea, .camberwell, .wimbledon")
				$(".two-up ul li").fitHeights()
				$(".three-up ul li").fitHeights()

		if $("body").is(".ual")
				$(".cta .two-up-full ul li").fitHeights()
				$(".st-cp .two-up-full ul li").fitHeights()
				$(".news .four-up-full ul li").fitHeights()
				$(".fe .four-up-full ul li").fitHeights()

		if $(".__gallery").length > 0
				$(".__gallery").each ->
						$(this).find("li").fitHeights()

		if $("#map-canvas").length > 0
				loadMapsScript()

