<?php 

// detect environment - either cms or live
function environment() {
	
	// get the value of the server uri
	$uri = $_SERVER['REQUEST_URI'];

	if (strpos($uri, 'phppreview') !== false) {
		$environment = 'cms';
	} else {
		$environment = 'live';
	}

	return $environment;
}

// set global optimisation factor for resrc.it images (not yet implemented)
function get_img_opt() {

	$opt = '60';
	return $opt;

}

?>