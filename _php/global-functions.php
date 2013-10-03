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

// print base URL
function siteURL() {
	$siteURL = 'http';
	if ($_SERVER["HTTPS"] == "on") {$siteURL .= "s";}
		$siteURL .= "://";
	if ($_SERVER["SERVER_PORT"] != "80") {
		$siteURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"];
	} else {
		$siteURL .= $_SERVER["SERVER_NAME"];
	}
	return $siteURL;
}

?>