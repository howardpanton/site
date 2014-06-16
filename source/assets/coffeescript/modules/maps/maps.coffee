###
		-------------------------------------------------------------
				Google maps
		-------------------------------------------------------------
###

# mapping marker icons to file paths
markerIcons = {}

map = {}

# array of all map markers
allMapMarkers = [];

#college Names/IDs JSON map college names to an ID - used for marker IDs on the map
collegesJSON =
	"colleges" : [

		{
			"id"			: "cam1",
			"college" : "camberwell",
			"name" 		: "Camberwell College of Arts"
		},

		{
			"id"			: "chel1",
			"college" : "chelsea",
			"name" 		: "Chelsea College of Arts"
		},

		{
			"id"			: "csm1",
			"college" : "csm",
			"name" 		: "Central Saint Martins"
		},

		{
			"id"			: "lcc1",
			"college" : "lcc",
			"name" 		: "London College of Communication"
		},

		{
			"id"			: "lcf1",
			"college" : "lcf",
			"name" 		: "London College of Fashion at Golden Lane"
		},

		{
			"id"			: "lcf2",
			"college" : "lcf",
			"name" 		: "London College of Fashion at John Princess St"
		},

		{
			"id"			: "lcf3",
			"college" : "lcf",
			"name" 		: "London College of Fashion at Lime Grove"
		},


		{
			"id"			: "lcf4",
			"college" : "lcf",
			"name" 		: "London College of Fashion at Curtain Rd"
		},

		{
			"id"			: "lcf5",
			"college" : "lcf",
			"name" 		: "London College of Fashion at High Holborn"
		},

		{
			"id"			:	"lcf6",
			"college" : "lcf",
			"name" 		: "London College of Fashion at Mare St"
		},

		{
			"id"			: "wim1",
			"college" : "wimbledon",
			"name" 		: "Wimbledon College of Arts"
		}
	]


# returns marker id for string name of college from t4 marker component
@getMarkerId = (t4markerName) ->
	markerObj = getObjects(collegesJSON, 'name' ,t4markerName)
	if (markerObj.length > 0)
	  return markerObj[0].id

# returns a college category for string name of college
@getMarkerCat = (t4markerName) ->
	markerObj = getObjects(collegesJSON, 'name' ,t4markerName)
	if (markerObj.length > 0)
	  return markerObj[0].college


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

	# set the marker ID - get values from collegesJSON above based on marker name
	markId = getMarkerId(data.name)
	markerCat = getMarkerCat(data.name)
	marker.set('id', markId)
	marker.set('college', markerCat)


	# add marker to list of all markers
	allMapMarkers.push(marker)

	# build the infowindow contents (the popup that appears when marker is clicked)
	contentString = "<h3>" + data.name + "</h3>" + "<p>" + data.content + "</p>"
	# set up click listener to show popup on click
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

			# set up HTML for the checkboxes
			checkboxHTML = "<div class=\"row margin-bottom-5x\">" + "<div class=\"college_filters\">" + "<input id=\"chk_camb\" data-college=\"camberwell\" type=\"checkbox\" checked name=\"cc\" class=\"before-label\">" + "<label for=\"chk_camb\">Camberwell College of Arts</label>" + "<input id=\"chk_csm\" data-college=\"csm\" type=\"checkbox\" checked name=\"cc\" class=\"before-label\">" + "<label for=\"chk_csm\">Central Saint Martins</label>" + "<input id=\"chk_chelsea\" data-college=\"chelsea\" type=\"checkbox\" checked name=\"cc\" class=\"before-label\">" + "<label for=\"chk_chelsea\">Chelsea College of Arts</label>" + "<input id=\"chk_LCC\" data-college=\"lcc\" type=\"checkbox\" checked name=\"cc\" class=\"before-label\">" + "<label for=\"chk_LCC\">London College of Communication</label>" + "<input id=\"chk_LCF\" data-college=\"lcf\" type=\"checkbox\" checked name=\"cc\" class=\"before-label\">" + "<label for=\"chk_LCF\">London College of Fashion</label>" + "<input id=\"chk_wimb\" data-college=\"wimbledon\"  type=\"checkbox\" checked name=\"cc\" class=\"before-label\">" + "<label for=\"chk_wimb\">Wimbledon College of Arts</label>" + "</div>" + "</div>"

			# IE 8 check - don't show college toggle checkboxes on IE8
			#              - show all colleges on map by default

			# add checkboxes to page if not old version of IE
			unless $("html").hasClass("lt-ie9")
				$(checkboxHTML).insertAfter ".row .google-map"

			#  if old IE, then show all colleges on map by default
			else



			findMatchingMarkers = (college) ->
			i = 0
			_matches = []
			while i < allMapMarkers.length
			  if allMapMarkers[i].college is college
			    console.log "found a match for :" + college
			    _matches.push(allMapMarkers[i])
			  i++

			return _matches


			toggleColleges = (colleges, setvisible) ->
				i = 0

				while i < colleges.length
				  if (setvisible)

				    colleges[i].setMap(map)
				  else
				  	colleges[i].setMap(null)
				  i++


			# click handler for the college checkboxes
			$(".college_filters :checkbox").click ->
				$this = $(this)

				# hide all open tooltips
				closeAllInfoWindows()

				chkbox_id = $this.attr("id")

				#find all map markers that match the college checkbox clicked
				_colleges_to_toggle = findMatchingMarkers($this.data("college"))

				# toggle marker visibility
				if $this.is(":checked")
					toggleColleges(_colleges_to_toggle, true)
				else
					toggleColleges(_colleges_to_toggle, false)




		# get markers from json object (currently outputted by t4 component from the content layout)
		setupMarkerIcons(map_markers_json)


		# loop through array of marker data to add markers to the map
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

