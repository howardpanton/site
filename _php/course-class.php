<?php

if(class_exists('Course') != true) 
{
	
	class Course {
    		// Create course object
    		public function __construct(Array $properties = array()) {
	
//		public static function get_college($query) {
//			parse_str($_SERVER['QUERY_STRING']);
//		}
//	
		function set_college($properties) {
		    parse_str($_SERVER['QUERY_STRING']);
		    if (isset($college)) {
		    	$d = urldecode($college);
		    }
		    if (isset($level)) {
		    	$l = urldecode($level);
		    }
		    if (isset($mode)) {
		    	$m = urldecode($mode);
		    }

		    //$m = urldecode($mode);
		    if ( isset($d)  ) {
		    	$t = $properties['college'] == $d;

		    }

		    if ( isset($l)  ) {
		    	$t = $properties['level'] == $l;

		    }
		    if ( isset($m)  ) {
		    	$t = $properties['mode'] == $m;

		    }  

		    if (isset($d) && isset($l) ) {
		    	$t = $properties['college'] == $d && $properties['level'] == $l;
		    }
		    if (isset($d) && isset($m) ) {
		    	$t = $properties['college'] == $d && $properties['mode'] == $m;
		    }
		    if (isset($l) && isset($m) ) {
		    	$t = $properties['level'] == $l && $properties['mode'] == $m;
		    }
		    
		    return($t);
	
		}
 
 			if (!empty($_GET)) {

			$test = array_filter($properties, "set_college");
					//print_r($test);
			} else {
				$test = $properties ;
			}
			     foreach($test as $key => $value) {
        		$this->{$key} = $value;
      		}
    		}

	}

}

?>

<?php
// Instantiante Array

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Foo",
"college" => "not",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "not",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "London College of fashion",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "London College of fashion",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);


$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "London College of fashion",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "London College of fashion",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "Central Saint Martins",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Foundation",
"college" => "Central Saint Martins",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "Central Saint Martins",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

  
$course = new Course($courses);

//parse_str($_SERVER['QUERY_STRING']);
//echo $test;
	//	    $college = "";
	//	    parse_str($_SERVER['QUERY_STRING']);
	//	    $d = urldecode($college);
		//    echo $d;
// output course array in JSON
// 

echo json_encode($course);