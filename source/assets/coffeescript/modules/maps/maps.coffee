###
		-------------------------------------------------------------
				Google maps
		-------------------------------------------------------------
###

# set global scope for markerIcons variable
markerIcons = {}

# addMarker - adds markers to google maps
@addMarker = (data, map, infoWindow) ->
	_markerIcon = data.marker
	_markerIcon = "default_UAL" if _markerIcon is "" or not _markerIcon?

	# Create the marker
	marker = new google.maps.Marker(
			position: new google.maps.LatLng(data.lat, data.lng)
			map: map
			title: data.name
			icon: markerIcons[_markerIcon]
	)

	# need to set this to the same name as the checkbox IDs (use a array map to get the values?)
	marker.set('id', 1)

	# build the window contents
	contentString = "<h3>" + data.name + "</h3>" + "<p>" + data.content + "</p>"
	google.maps.event.addListener marker, "click", ->
			infoWindow.open map, marker
			infoWindow.setContent contentString
			console.log ("you clicked marker : " + )
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

# create map options based on which device is viewing the page
@generateMapOptions = (_device, initial_location) ->

	mapOptions = ""

	switch _device

		when "desktop"
			mapOptions =
				zoom: mapConfig.zoom,
				center: initial_location,
				mapTypeControl: false,
				streetViewControl: false

		when "tablet"
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

		when "mobile"
			mapOptions =
				zoom: mapConfig.zoom,
				center: initial_location,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				panControl: false,
				draggable: false,
				streetViewControl: false,
				mapTypeControl: false,
				zoomControl: true,
				zoomControlOptions:
					style: google.maps.ZoomControlStyle.SMALL
					position: google.maps.ControlPosition.LEFT_TOP
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
		# initialLocation = new google.maps.LatLng(mapConfig.initLat, mapConfig.initLng)
		initialLocation = { lat: mapConfig.initLat, lng: mapConfig.initLng }

		# get device type - will return "desktop", "tablet" or "mobile"
		_device_type = getDeviceType()

		# generate map options based on desktop, tablet or mobile view
		mapOptions = generateMapOptions(_device_type, initialLocation)

		#use the new google maps styling
		#google.maps.visualRefresh = true;

		# set up a new google maps object
		mapDiv = document.getElementById("map-canvas")
		map = new google.maps.Map(mapDiv, mapOptions)



		# create the InfoWindow object outside of addMarker() to ensure only one window is open at once
		infoWindow = new google.maps.InfoWindow(
				content: ""
				maxWidth: 400
		)

		# function to close all infoWindows
		closeAllInfoWindows = ->
			"use strict"
			console.log "closing infowindow"
			infoWindow.close()
			return true



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





		# -- Show College Checkboxes below map --
		# set up to show college checkboxes if option is ticked in t4
		if _mapCanvas.data("college_checkboxes") is true
			console.log("show college checkboxes");
			# set up HTML for the checkboxes
			checkboxHTML = "<div class=\"row margin-bottom-5x\">" + "<div class=\"college_filters\">" + "<input id=\"chk_camb\" type=\"checkbox\" name=\"cc\" class=\"before-label\">" + "<label for=\"chk_camb\">Camberwell College of Arts</label>" + "<input id=\"chk_csm\" type=\"checkbox\" name=\"cc\" class=\"before-label\">" + "<label for=\"chk_csm\">Central Saint Martins</label>" + "<input id=\"chk_chelsea\" type=\"checkbox\" name=\"cc\" class=\"before-label\">" + "<label for=\"chk_chelsea\">Chelsea College of Arts</label>" + "<input id=\"chk_LCC\" type=\"checkbox\" name=\"cc\" class=\"before-label\">" + "<label for=\"chk_LCC\">London College of Communication</label>" + "<input id=\"chk_LCF\" type=\"checkbox\" name=\"cc\" class=\"before-label\">" + "<label for=\"chk_LCF\">London College of Fashion</label>" + "<input id=\"chk_wimb\" type=\"checkbox\" name=\"cc\" class=\"before-label\">" + "<label for=\"chk_wimb\">Wimbledon College of Arts</label>" + "</div>" + "</div>"

			# IE 8 check - don't show college toggle checkboxes on IE8
			#              - show all colleges on map by default

			# add checkboxes to page if not old version of IE
			unless $("html").hasClass("lt-ie9")
				$(checkboxHTML).insertAfter ".row .google-map"

			#  if old IE, then show all colleges on map by default
			else
  			# # show all college locations on map
  			# markerCamberwell.setVisible true
  			# markerCSM.setVisible true
			  # markerChelsea.setVisible true
			  # markerLCC.setVisible true
			  # markerLCF1.setVisible true
			  # markerLCF2.setVisible true
			  # markerLCF3.setVisible true
			  # markerLCF4.setVisible true
			  # markerLCF5.setVisible true
			  # markerLCF6.setVisible true
			  # markerWimbledon.setVisible true

			# click handler for the college checkboxes
			$(".college_filters :checkbox").click ->
				console.log "checkbox clicked"
				# hide all open tooltips
				closeAllInfoWindows()
				$this = $(this)
				chkbox_id = $this.attr("id")
				console.log "you clicked the " + chkbox_id + " checkbox"
				if $this.is(":checked")
					switch chkbox_id
						when "chk_camb"
							markerCamberwell.setVisible true
							camberwellPopup.open map, markerCamberwell
						when "chk_csm"
							markerCSM.setVisible true
							csmPopup.open map, markerCSM
						when "chk_chelsea"
							markerChelsea.setVisible true
							chelseaPopup.open map, markerChelsea
						when "chk_LCC"
							markerLCC.setVisible true
							lccPopup.open map, markerLCC
						when "chk_LCF"
							markerLCF1.setVisible true
							markerLCF2.setVisible true
							markerLCF3.setVisible true
							markerLCF4.setVisible true
							markerLCF5.setVisible true
							markerLCF6.setVisible true
						when "chk_wimb"
							markerWimbledon.setVisible true
							wimbPopup.open map, markerWimbledon
						else
				else
					switch chkbox_id
						when "chk_camb"
							markerCamberwell.setVisible false
						when "chk_csm"
							markerCSM.setVisible false
						when "chk_chelsea"
							markerChelsea.setVisible false
						when "chk_LCC"
							markerLCC.setVisible false
						when "chk_LCF"
							markerLCF1.setVisible false
							markerLCF2.setVisible false
							markerLCF3.setVisible false
							markerLCF4.setVisible false
							markerLCF5.setVisible false
							markerLCF6.setVisible false
						when "chk_wimb"
							markerWimbledon.setVisible false
						else










		# TO DO:
		# Enhancement: Add Markers to the map from external JSON data
		# $.getJSON "http://d27lwoqz7s24cy.cloudfront.net/assets/js/json/ual-map-markers.json?callback=?", (data) ->
		# $.getJSON "http://localhost:9000/prototypes/accomodation-map/markers.json?callback=?", (data) ->
		# 	alert "testing"
		# 	map_markers_json = data
		# 	console.log data[0]
		# 	# define custom map markers
		# 	setupMarkerIcons(map_markers_json)
		# 	return

		# get markers from json object (currently outputted by t4 component from the content layout)
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
		script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBg6p9uTJZjUi3vqZWn07sriYpr5zV3_jg&sensor=false&" + "callback=loadMap"
		document.body.appendChild script
		return

