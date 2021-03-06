###
		-------------------------------------------------------------
				Google maps
		-------------------------------------------------------------
###

# set global scope for markerIcons variable
markerIcons = {}

# addMarker - adds markers to google maps
@addMarker = (data, map, infoWindow) ->

		# Create the marker
		marker = new google.maps.Marker(
				position: new google.maps.LatLng(data.lat, data.lng)
				map: map
				title: data.name
				# icon: data.marker
				icon: markerIcons["collegeMarker"]

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

#setup custom map markers
@setupMarkerIcons = (data) ->

	# for each JSON entry in map_markers_json, create a new custom marker image
	for i of data
		_this = data[i]

		icon_name = _this.markerName

		markerIcons[icon_name] = {
			url : _this.url
			scaledSize: new google.maps.Size(_this.scaledSize_x, _this.scaledSize_y)
			origin: new google.maps.Point(_this.origin_x, _this.origin_y)
			anchor: new google.maps.Point(_this.anchor_x, _this.anchor_y)
		}


@generateMapOptions = (screen_width, initial_location) ->

	mapOptions = ""

	switch screen_width

		when "gDesktop"
			console.log "setup Map for desktop"
			mapOptions =
				zoom: mapConfig.zoom,
				center: initial_location,
				mapTypeControl: false,
				streetViewControl: false

		when "gTablet"
			console.log "setup Map for tablet"
			mapOptions =
				zoom: mapConfig.zoom,
				center: initial_location
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				mapTypeControl: false,
				draggable: false,
				zoomControl: true,
				zoomControlOptions:
					style: google.maps.ZoomControlStyle.SMALL,
					position: google.maps.ControlPosition.LEFT_TOP,
				panControl: false,
				streetViewControl: false

		when "gMobile"
			console.log "setup Map for mobile"
			mapOptions =
				zoom: mapConfig.zoom,
				center: initial_location,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				panControl: true,
				draggable: false,
				streetViewControl: false,
				mapTypeControl: false,
				zoomControl: true,
				zoomControlOptions:
					style: google.maps.ZoomControlStyle.SMALL
					position: google.maps.ControlPosition.LEFT_BOTTOM
		else
			# output desktop settings if no matches found
			mapOptions =
					zoom: mapConfig.zoom,
					center: initial_location,
					mapTypeControl: false,
					streetViewControl: false

	return mapOptions


# loadMap - initializes map with settings from JSON and from classnames on the map-canvas element
@loadMap = ->

		gJson = []

		# create map as per mapConfig object properties set in view
		initialLocation = new google.maps.LatLng(mapConfig.initLat, mapConfig.initLng)


		# get current screen width
		_screen_width = getWindowSize()

		# generate map options based on desktop, tablet or mobile view
		mapOptions = generateMapOptions(_screen_width, initialLocation)

		# set up a new google maps object
		mapDiv = document.getElementById("map-canvas")
		map = new google.maps.Map(mapDiv, mapOptions)



		# create the InfoWindow object outside of addMarker() to ensure only one window is open at once
		infoWindow = new google.maps.InfoWindow(
				content: ""
				maxWidth: 400
		)


		# -- Show Transit & Bicycling Layers --
		# These will display if options are ticked inside the map-component in t4
		# The t4 component will data- attributes to the #map-canvas div which we then check values of below
		_mapCanvas = $("#map-canvas")

		if _mapCanvas.data("transit-layer") is true
			transitLayer = new google.maps.TransitLayer()
			transitLayer.setMap map

		if _mapCanvas.data("bicycling-layer") is true
			bikeLayer = new google.maps.BicyclingLayer()
			bikeLayer.setMap map



		# Add Markers to the map from JSON data

		# define custom map markers
		setupMarkerIcons(map_markers_json)

		# loop through array of marker data
		for i of maps_json
			addMarker maps_json[i], map, infoWindow
		return
# loadMap



# inject <script> tag into the page to load the google map on the page
@loadMapsScript = ->
		script = document.createElement("script")
		script.type = "text/javascript"
		script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&" + "callback=loadMap"
		document.body.appendChild script
		return

