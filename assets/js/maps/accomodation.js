
function loadMap() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
      'callback=initializeMap';
  document.body.appendChild(script);
}

function initializeMap() {
			latlng = new google.maps.LatLng(51.501657,-0.120546); 
		var settings = {
			zoom: 12,
			maxZoom: 16,
			minZoom: 11,
			center: latlng,
			mapTypeControl: false,
			scrollwheel: false,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU	  
    },
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.DEFAULT
    },
	panControl:false,
	streetViewControl:true,
			mapTypeId: google.maps.MapTypeId.ROADMAP	
    };
	
	var map = new google.maps.Map(document.getElementById("map_canvas"), settings
	);
  var stylez = 
		[
  {
    "featureType": "landscape",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "road",
    "stylers": [
      { "visibility": "simplified" },
      { "saturation": -91 },
      { "lightness": 48 },
      { "gamma": 4.61 }
    ]
  },{
  }
]

var asOfficePos = new google.maps.LatLng(51.413287,-0.21164);
var companyMarker = new google.maps.Marker({
	position: asOfficePos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
	title:"Wimbledon College of Art"
});
var asOfficePos = new google.maps.LatLng(51.490309,-0.128449);
var companyMarker = new google.maps.Marker({
	position: asOfficePos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
	title:"Chelsea College of Art and Design"
});
var asOfficePos = new google.maps.LatLng(51.535538,-0.125121);
var companyMarker = new google.maps.Marker({
	position: asOfficePos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
	title:"Central Saint Martins"
});
var asOfficePos = new google.maps.LatLng(51.49457,-0.101627);
var companyMarker = new google.maps.Marker({
	position: asOfficePos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
	title:"London College of Communication"
});
var asOfficePos = new google.maps.LatLng(51.474193,-0.081135);
var companyMarker = new google.maps.Marker({
	position: asOfficePos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
	title:"Camberwell College of Arts"
});
var asOfficePos = new google.maps.LatLng(51.523417,-0.095783);
var companyMarker = new google.maps.Marker({
	position: asOfficePos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
	title:"London College of Fashion at Golden Lane"
});
var asOfficePos = new google.maps.LatLng(51.515687,-0.143341);
var companyMarker = new google.maps.Marker({
	position: asOfficePos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
	title:"London College of Fashion at John Princes St"
});
var asOfficePos = new google.maps.LatLng(51.503721,-0.228086);
var companyMarker = new google.maps.Marker({
	position: asOfficePos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
	title:"London College of Fashion at Lime Grove"
});
var asOfficePos = new google.maps.LatLng(51.52516,-0.079974);
var companyMarker = new google.maps.Marker({
	position: asOfficePos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
	title:"London College of Fashion at Curtain Rd"
});
var asOfficePos = new google.maps.LatLng(51.51773,-0.116646);
var companyMarker = new google.maps.Marker({
	position: asOfficePos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
	title:"London College of Fashion at High Holborn"
});
var asOfficePos = new google.maps.LatLng(51.540824,-0.054772);
var companyMarker = new google.maps.Marker({
	position: asOfficePos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
	title:"London College of Fashion at Mare St"
});

var companyPos = new google.maps.LatLng(51.468847,-0.120077);
var companyMarker = new google.maps.Marker({
	position: companyPos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
});
var companyPos = new google.maps.LatLng(51.531621,-0.082828);
var companyMarker = new google.maps.Marker({
	position: companyPos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
});
var companyPos = new google.maps.LatLng(51.52291,-0.259908);
var companyMarker = new google.maps.Marker({
	position: companyPos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
});
var companyPos = new google.maps.LatLng(51.501963,-0.103609);
var companyMarker = new google.maps.Marker({
	position: companyPos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
	
});
var companyPos = new google.maps.LatLng(51.477912,-0.085467);
var companyMarker = new google.maps.Marker({
	position: companyPos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
});
var companyPos = new google.maps.LatLng(51.473785,-0.083723);
var companyMarker = new google.maps.Marker({
	position: companyPos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
});
var companyPos = new google.maps.LatLng(51.423985,-0.150044);
var companyMarker = new google.maps.Marker({
	position: companyPos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
});
var companyPos = new google.maps.LatLng(51.541821,-0.05468);
var companyMarker = new google.maps.Marker({
	position: companyPos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
});
var companyPos = new google.maps.LatLng(51.518664,-0.066458);
var companyMarker = new google.maps.Marker({
	position: companyPos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
});
var companyPos = new google.maps.LatLng(51.546855,-0.120874);
var companyMarker = new google.maps.Marker({
	position: companyPos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
});
var companyPos = new google.maps.LatLng(51.562479,-0.107623);
var companyMarker = new google.maps.Marker({
	position: companyPos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
});
var companyPos = new google.maps.LatLng(51.474808,-0.100039);
var companyMarker = new google.maps.Marker({
	position: companyPos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
});
var asOfficePos = new google.maps.LatLng(51.521108,-0.117634);
var companyMarker = new google.maps.Marker({
	position: asOfficePos,
	map: map,
	animation: google.maps.Animation.DROP,
	optimized: false,
	title:"Come in and see us at 5 Richbell Place, WC1N 3LA"
});
	var transitLayer = new google.maps.TransitLayer();
transitLayer.setMap(map);
var bikeLayer = new google.maps.BicyclingLayer();
bikeLayer.setMap(map);
	}
