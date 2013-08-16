<?php

	$d = file_get_contents("CourseSample.json");
	$test = json_decode($d, true);
	//var_dump($test['courses'][0]);
	$f = $test['courses'][0];
	
	for ($i = 0; $i < count($f); $i++) {
		
		echo $test['courses'][0]['courseid'];
		echo "\n";
	}
?>