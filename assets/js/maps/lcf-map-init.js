// variables should be declared outside the function in order to have global scope
var initialLocation;
var georssLayer;
var map;
var show_georss = 1;
var gMarker = [];


function initialize() {

	var initialLocation = new google.maps.LatLng(48.69096039092549, 61.69921875); // somewhere in Kazakhstan
	var London = new google.maps.LatLng(51.515482718, -0.142903122); // London


	var styles = {

	      'LCF': [

	        {
	            featureType: "water",
	            elementType: "all",
	            stylers: [
	                { visibility: "on" },
	                { hue: "#3B5A6F" },
	                { saturation: 30 },
	                { lightness: 40 },
	            ]
	        },

	        { featureType: "administrative.country", elementType: "all", stylers: [ { visibility: "simplified" }, { hue: "#c11c89" }, { saturation: 27 }, { lightness: 36 } ] },

	        { featureType: "administrative", elementType: "labels", stylers: [ { visibility: "on" }, { saturation: -64 }, { hue: "#555555" }, { lightness: 13 } ] },
	
					{ featureType: "administrative.locality", elementType: "labels", stylers: [{ visibility: "off" }] },

	        { featureType: "transit", elementType: "geometry", stylers: [ { hue: "#3B5A6F" }, { saturation: 100 }, { gamma: 0.59 }, { lightness: 44 }, { visibility: "simplified" } ] },
	
					{ featureType: "road", elementType: "geometry", stylers: [ { visibility: "simplified" }, { hue: "#3B5A6F" }, { saturation: 27 }, { lightness: 36 } ] },

	        {
	            featureType: "landscape.natural",
	            elementType: "all",
	            stylers: [
	                { lightness: 0 },
	                { saturation: 100 },
	                { hue: "#ffffff" },
	                { lightness: 100 }
	            ]
	        } 

	        ]

	    };
	
	for (var s in styles) {

	        var myOptions = {
	            mapTypeControlOptions: {
	                mapTypeIds: [s],
	            },
	            zoom: 2,
	            center: initialLocation,
	            mapTypeId: s,
	            disableDefaultUI: true
	        }
	        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	        var styledMapType = new google.maps.StyledMapType(styles[s], {name: s});
	        map.mapTypes.set(s, styledMapType);


	    }
	

	


	// Loop through markers
	for (i in markers) addMarker(markers[i]);
		
	

	// create the InfoWindow object outside of addMarker() to ensure only one window is open at once
	// http://stackoverflow.com/questions/1875596/have-just-one-infowindow-open-in-google-maps-api-v3
	var infoWindow = new google.maps.InfoWindow({
	   content: '',
			maxWidth: 400
	});

  function addMarker(data, image) {
		// Create the marker
		var marker = new google.maps.Marker({
       	position: new google.maps.LatLng(data.lat, data.lng),
       	map: map,
       	title: data.name
    });
		
		
		
		// push the new marker objects into arrays
		if (data == markers[i]) {
			gMarker.push(marker); 
		} 
		
		

		// build the window contents
		var contentString = '<h3>' + data.name + '</h3>' + '<p>' + data.content + '</p>';

		google.maps.event.addListener(marker, 'click', function() { 
			infoWindow.open(map,marker);
			infoWindow.setContent(contentString);	
    });

	} // addMarker

	
	
	// add a welcome window just to say hi!
	infoWindow.setContent('<div id="welcome-window"><h3>Welcome to our world!</h3><p>The markers on this map will lead you to further information about our international projects, websites for our ERASMUS partners, plus news from around the world.</p></div>');
	infoWindow.setPosition(London);
	infoWindow.open(map);
	
	
	
} // initialize()